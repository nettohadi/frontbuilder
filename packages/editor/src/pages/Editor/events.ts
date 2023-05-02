import { current } from '@src/common/current';
import { ElementType, ParentType } from '@frontbuilder/renderer';
import global from '@src/global';
import {
  addChildElement,
  addChildElementAfter,
  addChildElementBefore,
  updateElementProp,
} from '@src/global/element';
import {
  applyHoverEffect,
  copyElement,
  goUpUntil,
  removeClasses,
  removeHoverEffect,
} from '@src/utils/helperFunctions';

let pushPosition = '';
let dragPosition = { x: 0, y: 0 };
let lastPendingUpdateTextContent: () => void;

export const commonEvent = (
  element: ElementType,
  parent: ParentType,
  rerender: () => void,
  rerenderElement: () => void
) => {
  if (global.getMode() === 'preview') return {};

  const selectElement = () => {
    if (current.isEditingTextContent() && element === current.getElement())
      return;

    current.uuid = element.uuid;
    current.setElement(element);
    current.setParent(parent);
    current.setRerender(rerenderElement);

    if (current.isEditingTextContent()) {
      current.setIsEditingTextContent(false);
      lastPendingUpdateTextContent();
    }

    // turn off resizing status
    current.setIsResizing({ width: false, height: false });
    // rerender current element
    rerender();
  };

  element['select'] = selectElement;

  return {
    onMouseOver: (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      applyHoverEffect(element.id);
    },
    onMouseMove: (e: any) => {},
    onMouseOut: (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      removeHoverEffect();
    },
    onClick: (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      current.elementIdToScrollIntoView = `tr-${element.id}`;
      selectElement();
    },
    onDoubleClick: (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      if (!element.contentIsEditable) return;

      current.setIsEditingTextContent(true);
      rerender();
    },
    onKeyUp: (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (!current.isEditingTextContent()) return;

      lastPendingUpdateTextContent = () => {
        updateElementProp(element, {
          textContent: e.target.innerHTML,
        });
      };
    },
  };
};

let lastDraggedElement = '';
export const draggableEvent = (
  element: ElementType | null,
  parent: ParentType,
  rerender: () => void,
  isAdding: boolean = false
) => {
  if (global.getMode() === 'preview') return {};
  const isEditingTextContent = current.isEditingTextContent();

  return {
    draggable: !isEditingTextContent,
    onDragStart: (e: any) => {
      if (isEditingTextContent) return;

      setDragCursor(true);

      if (!lastDraggedElement) {
        // only set drag image if it's not set yet
        lastDraggedElement = element?.type || '';
        div.innerHTML = lastDraggedElement;
      }

      e.target = goUpUntil(e.target, 'selectable');

      e.target.style.opacity = 0;
      e.dataTransfer.setDragImage(div, 5, 5);
    },
    onDragEnd: (e: any) => {
      setDragCursor(false);

      lastDraggedElement = '';
      removeClasses([
        'hover-all',
        'hover-right',
        'hover-left',
        'hover-bottom',
        'hover-top',
      ]);
      if (isEditingTextContent) return;

      e.stopPropagation();
      e.preventDefault();
      e.target = goUpUntil(e.target, 'selectable');
      e.target.style.opacity = 1;
      const targetElement = current.getTargetElement();
      const targetParent = current.getTargetParent();
      const currentTargetIndex = targetParent?.children.indexOf(
        current.getTargetElement() as any
      );

      // bail if any of the below is null
      if (!targetParent || !element || !targetElement) return;

      // should not be able to drop on itself
      if (targetParent === element) return;

      // should not be able to drop on its children
      if (
        targetParent?.id.startsWith(element?.id) &&
        targetParent !== element &&
        !isAdding
      )
        return;

      if (
        pushPosition !== 'inside' &&
        (currentTargetIndex === null ||
          currentTargetIndex === undefined ||
          currentTargetIndex === -1)
      ) {
        return;
      }

      element.select = null;
      const elementToMove: ElementType & string = isAdding
        ? copyElement(element, true)
        : element;

      if (isAdding) elementToMove.getParent = () => null;

      const isTargetParentDirectionReversed = targetParent?.props.flexDirection
        ?.toLowerCase()
        .includes('reverse');

      if (pushPosition === 'before' && targetParent) {
        if (isTargetParentDirectionReversed) {
          addChildElementAfter(targetParent, elementToMove, currentTargetIndex);
        } else {
          addChildElementBefore(
            targetParent,
            elementToMove,
            currentTargetIndex
          );
        }
      }

      if (pushPosition === 'after' && targetParent) {
        if (isTargetParentDirectionReversed) {
          addChildElementBefore(
            targetParent,
            elementToMove,
            currentTargetIndex
          );
        } else {
          addChildElementAfter(targetParent, elementToMove, currentTargetIndex);
        }
      }

      if (pushPosition === 'inside') {
        addChildElement(targetParent, elementToMove);
      }

      current.setTargetParent(null);
      rerender();
    },
    onDragOver: (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      if (dragPosition.x === e.clientX && dragPosition.y === e.clientY) return;
      dragPosition = { x: e.clientX, y: e.clientY };

      if (isEditingTextContent) return;

      e.target = goUpUntil(e.target, 'selectable');

      if (!e.target) return;

      pushPosition = detectDropPosition(e);
      removeClasses([
        'hover-all',
        'hover-right',
        'hover-left',
        'hover-bottom',
        'hover-top',
      ]);
      e.target.classList.add(getDropPositionClass(pushPosition, parent));

      if (
        e.target?.classList.contains('droppable') &&
        pushPosition === 'inside'
      ) {
        current.setTargetParent(element);
      } else {
        current.setTargetParent(parent);
      }
    },
    onDragEnter: (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      if (isEditingTextContent) return;

      e.target = goUpUntil(e.target, 'selectable');
      current.setTargetElement(element);
    },
  };
};

const detectDropPosition = (e: any) => {
  const rect = e.target.getBoundingClientRect();
  const divider = 8;
  const closeToTheRight = rect.right - e.clientX <= rect.width / divider;
  const closeToTheBottom = rect.bottom - e.clientY <= rect.height / divider;
  const closeToTheLeft = e.clientX - rect.left <= rect.width / divider;
  const closeToTheTop = e.clientY - rect.top <= rect.height / divider;

  const closeToTheCenterAndDroppable =
    !closeToTheRight &&
    !closeToTheBottom &&
    !closeToTheLeft &&
    !closeToTheTop &&
    e.target.classList.contains('droppable');

  if (closeToTheRight || closeToTheBottom) {
    return 'after';
  }

  if (closeToTheLeft || closeToTheTop) {
    return 'before';
  }

  if (closeToTheCenterAndDroppable) {
    return 'inside';
  }

  return 'after';
};

const getDropPositionClass = (pushPosition: string, parent: ParentType) => {
  if (pushPosition === 'before') {
    return parent?.props.flexDirection === 'row' ||
      parent?.props.flexDirection === 'row-reverse'
      ? 'hover-left'
      : 'hover-top';
  }

  if (pushPosition === 'after') {
    return parent?.props.flexDirection === 'row' ||
      parent?.props.flexDirection === 'row-reverse'
      ? 'hover-right'
      : 'hover-bottom';
  }

  return 'hover-all';
};

const div = document.createElement('div');
div.style.width = '80px';
div.style.height = '40px';
div.style.position = 'fixed';
div.style.top = '-400px';
div.style.borderRadius = '5px';
div.style.backgroundColor = 'white';
div.style.textAlign = 'center';
div.style.display = 'flex';
div.style.justifyContent = 'center';
div.style.alignItems = 'center';
div.style.fontSize = '14px';
div.style.padding = '5px';
document.body.appendChild(div);

const setDragCursor = (value: boolean) => {
  const html = document.getElementsByTagName('html').item(0);
  html?.classList.toggle('grabbing', value);
};
