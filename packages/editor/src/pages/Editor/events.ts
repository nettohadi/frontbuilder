import { current } from '@src/common/current';
import { ElementType, ParentType } from '@src/types';
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

      updateElementProp(element, {
        textContent: e.target.innerHTML,
      });
    },
  };
};

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

      document.body.style.cursor = 'default';
      e.target = goUpUntil(e.target, 'selectable');

      e.target.style.opacity = 0;
      e.dataTransfer.setDragImage(div, 10, 10);
    },
    onDragEnd: (e: any) => {
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

      if (pushPosition === 'before' && targetParent) {
        addChildElementBefore(targetParent, elementToMove, currentTargetIndex);
      }

      if (pushPosition === 'after' && targetParent) {
        addChildElementAfter(targetParent, elementToMove, currentTargetIndex);
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

      while (e.target) {
        if (e.target.classList?.contains('selectable')) {
          e.target.classList.add('hover-all');
          break;
        }
        e.target = e.target.parentNode;
      }

      if (!e.target) return;

      removeClasses([
        'hover-all',
        'hover-right',
        'hover-left',
        'hover-bottom',
        'hover-top',
      ]);

      pushPosition = detectDropPosition(e, parent);

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

      while (e.target) {
        if (e.target.classList?.contains('selectable')) {
          break;
        }
        e.target = e.target.parentNode;
      }
      current.setTargetElement(element);
    },
    onDragLeave: (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      if (isEditingTextContent) return;

      removeClasses([
        'hover-all',
        'hover-right',
        'hover-left',
        'hover-bottom',
        'hover-top',
      ]);
    },
  };
};

const detectDropPosition = (e: any, parent: ParentType): string => {
  const rect = e.target.getBoundingClientRect();

  const divider = 10;
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
    e.target.classList.add(
      parent?.props.flexDirection === 'row' ? 'hover-right' : 'hover-bottom'
    );
    return 'after';
  }

  if (closeToTheLeft || closeToTheTop) {
    e.target.classList.add(
      parent?.props.flexDirection === 'row' ? 'hover-left' : 'hover-top'
    );
    return 'before';
  }

  if (closeToTheCenterAndDroppable) {
    e.target.classList.add('hover-all');
    return 'inside';
  }

  return 'after';
};

const div = document.createElement('div');
div.style.width = '30px';
div.style.height = '30px';
div.style.position = 'fixed';
div.style.top = '-50px';
div.style.borderRadius = '50%';
div.style.backgroundColor = '#4bcccc';
document.body.appendChild(div);
