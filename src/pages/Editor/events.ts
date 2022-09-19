import { current } from '@src/common/current';
import { ElementType } from '@src/types';
import global from '@src/global';

let pushPosition = '';

export const commonEvent = (
  element: ElementType,
  parent: ElementType | null,
  rerender: () => void
) => {
  if (global.getMode() === 'preview') return {};
  return {
    onMouseOver: (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      while (e.target) {
        if (e.target.classList.contains('selectable')) {
          e.target.classList.add('hover-selected');
          break;
        }
        e.target = e.target.parentNode;
      }
    },
    onMouseMove: (e: any) => {
      // console.clear();
      // console.log('mouse move', e.target);
    },
    onMouseOut: (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      while (e.target) {
        if (e.target.classList.contains('selectable')) {
          e.target.classList.remove('hover-selected');
          e.target.classList.remove('hover-all');
          e.target.classList.remove('hover-left');
          e.target.classList.remove('hover-right');
          break;
        }
        e.target = e.target.parentNode;
      }
    },
    onClick: (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      current.setElement(element);
      current.setParent(parent);
      current.setNode(e.target);
      rerender();
    },
  };
};

export const draggableEvent = (
  element: ElementType | null,
  parent: ElementType | null,
  rerender: () => void,
  isAdding: boolean = false
) => {
  if (global.getMode() === 'preview') return {};
  return {
    draggable: true,
    onDragStart: (e: any) => {
      document.body.style.cursor = 'default';
      e.target.style.opacity = 0;
      e.dataTransfer.setDragImage(div, 10, 10);
    },
    onDragEnd: (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      e.target.style.opacity = 1;
      if (current.getTargetParent() && element) {
        const newElement = isAdding
          ? JSON.parse(JSON.stringify(element))
          : element;

        const targetParent = current.getTargetParent();
        const currentTargetIndex = targetParent?.children.indexOf(
          current.getTargetElement() as any
        );

        if (pushPosition === 'inside') {
          targetParent?.children.push(newElement as any);
        } else if (pushPosition === 'before' && targetParent) {
          console.log({ pushPosition, currentTargetIndex, targetParent });
          // @ts-ignore
          targetParent.children = targetParent.children.reduce(
            (acc: any, child: any, _index: number) => {
              if (_index === currentTargetIndex) {
                acc.push(newElement, child);
                console.log('push before');
              } else {
                acc.push(child);
              }
              console.log({ acc });
              return acc;
            },
            []
          );
        } else if (targetParent) {
          console.log({ pushPosition, currentTargetIndex, targetParent });
          // @ts-ignore
          targetParent.children = targetParent.children.reduce(
            (acc: any, child: any, _index: number) => {
              if (_index === currentTargetIndex) {
                acc.push(child, newElement);
              } else {
                acc.push(child);
              }

              return acc;
            },
            []
          );
        }

        //remove excess children
        if (parent) {
          parent.children.splice(parent.children.indexOf(element as any), 1);
        }
        current.setTargetParent(null);
        rerender();
      }
    },
    onDragOver: (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      while (e.target) {
        if (e.target.classList?.contains('selectable')) {
          e.target.classList.add('hover-all');
          break;
        }
        e.target = e.target.parentNode;
      }

      if (!e.target) return;
      const rect = e.target.getBoundingClientRect();
      e.target.classList.remove('hover-right');
      e.target.classList.remove('hover-left');
      e.target.classList.remove('hover-all');

      if (rect.right - e.clientX <= 15) {
        e.target.classList.add('hover-right');
        pushPosition = 'after';
      } else if (e.clientX - rect.left <= 15) {
        e.target.classList.add('hover-left');
        pushPosition = 'before';
      } else if (e.target.classList.contains('droppable')) {
        e.target.classList.add('hover-all');
        pushPosition = 'inside';
      }
    },
    onDragEnter: (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      while (e.target) {
        if (e.target.classList?.contains('selectable')) {
          break;
        }
        e.target = e.target.parentNode;
      }
      current.setTargetElement(element);
      if (e.target?.classList.contains('droppable')) {
        current.setTargetParent(element);
      } else {
        current.setTargetParent(parent);
      }
    },
    onDragLeave: (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      while (e.target) {
        if (e.target.classList?.contains('selectable')) {
          e.target.classList.remove('hover-selected');
          e.target.classList.remove('hover-all');
          e.target.classList.remove('hover-left');
          e.target.classList.remove('hover-right');
          break;
        }
        e.target = e.target.parentNode;
      }
    },
  };
};

const div = document.createElement('div');
div.style.width = '30px';
div.style.height = '30px';
div.style.position = 'fixed';
div.style.top = '-50px';
div.style.borderRadius = '50%';
div.style.backgroundColor = '#4bcccc';
document.body.appendChild(div);
