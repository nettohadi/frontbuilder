import { ElementType, ParentType } from '@src/types';
import { goUpUntil, removeClasses } from '@src/utils/helperFunctions';
import { current } from '@src/common/current';
import {
  addChildElement,
  addChildElementAfter,
  addChildElementBefore,
} from '@src/global/element';

let pushPosition = 'inside';
const dragDropEvent = (
  element: ElementType,
  expandTree?: (isOpen?: boolean) => void,
  rerender?: () => void,
  parent?: ParentType
) => {
  return {
    onDragStart: (e: any) => {
      e.target = goUpUntil(e.target, 'tree');
      e.target.classList.add('tree-dragging');

      const selector = `[data-id^="${element.id}"]`;
      const children = document.querySelectorAll(selector);
      Array.from(children).forEach((element) => {
        element.classList.add('tree-dragging');
        // (element as HTMLElement).style.opacity = '0';
      });

      e.dataTransfer.setDragImage(div, 10, 10);
    },
    onDragOver: (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      e.target = goUpUntil(e.target, 'tree');

      if (e.target.classList?.contains('tree-dragging')) return;

      const rect = e.target.getBoundingClientRect();
      e.target.classList.remove('hover-right');
      e.target.classList.remove('hover-left');
      e.target.classList.remove('hover-all');

      if (rect.bottom - e.clientY <= rect.height / 6) {
        e.target.classList.remove('hover-top');
        e.target.classList.add('hover-bottom');
        pushPosition = 'after';
      } else if (e.clientY - rect.top <= rect.height / 6) {
        e.target.classList.remove('hover-bottom');
        e.target.classList.add('hover-top');
        pushPosition = 'before';
      } else if (e.target.classList.contains('droppable')) {
        e.target.classList.add('hover-all');
        if (expandTree) expandTree();
        pushPosition = 'inside';
      }

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
      if (e.target.classList?.contains('tree-dragging')) return;

      e.stopPropagation();
      e.preventDefault();

      e.target = goUpUntil(e.target, 'tree');
      current.setTargetElement(element);
    },
    onDragLeave: (e: any) => {
      removeClasses([
        'hover-selected',
        'hover-all',
        'hover-top',
        'hover-bottom',
      ]);
    },
    onDragEnd: (e: any) => {
      removeClasses([
        'hover-selected',
        'hover-all',
        'hover-top',
        'hover-bottom',
        'tree-dragging',
      ]);

      const targetElement = current.getTargetElement();
      const targetParent = current.getTargetParent();
      const currentTargetIndex = targetParent?.children.indexOf(
        targetElement as any
      );
      console.log({
        targetElement,
        targetParent,
        currentTargetIndex,
        element,
        parent,
        pushPosition,
      });

      // bail if any of the below is null
      if (!targetParent || !element || !targetElement) return;

      // should not be able to drop on itself
      if (targetParent === element) return;

      // should not be able to drop on its children
      if (targetParent?.id.startsWith(element.id) && targetParent !== element)
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
      const newElement: ElementType = JSON.parse(JSON.stringify(element));

      if (pushPosition === 'before' && targetParent) {
        addChildElementBefore(
          targetParent,
          newElement as any,
          currentTargetIndex
        );
      }

      if (pushPosition === 'after' && targetParent) {
        addChildElementAfter(
          targetParent,
          newElement as any,
          currentTargetIndex
        );
      }

      if (pushPosition === 'inside') {
        addChildElement(targetParent, newElement as any);
      }

      //remove excess children
      if (parent) {
        parent.children.splice(parent.children.indexOf(element as any), 1);
      }

      current.setTargetParent(null);
      if (rerender) rerender();
    },
  };
};

export default dragDropEvent;

const div = document.createElement('div');
div.style.width = '15px';
div.style.height = '15px';
div.style.position = 'fixed';
div.style.top = '-50px';
div.style.borderRadius = '50%';
div.style.backgroundColor = '#4bcccc';
document.body.appendChild(div);
