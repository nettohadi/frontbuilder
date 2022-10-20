import { ElementType, ParentType } from '@src/types';

const dragDropEvent = (
  element: ElementType,
  toggleTree?: () => void,
  parent?: ParentType
) => {
  return {
    onDragStart: (e: any) => {
      e.target.style.opacity = 0;
      e.dataTransfer.setDragImage(div, 10, 10);
    },
    onDragOver: (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      while (e.target) {
        if (e.target.classList?.contains('tree')) {
          e.target.classList.add('hover-all');
          break;
        }
        e.target = e.target.parentNode;
      }

      const rect = e.target.getBoundingClientRect();
      e.target.classList.remove('hover-right');
      e.target.classList.remove('hover-left');
      e.target.classList.remove('hover-all');

      if (rect.bottom - e.clientY <= rect.height / 6) {
        e.target.classList.remove('hover-top');
        e.target.classList.add('hover-bottom');
        // pushPosition = 'after';
      } else if (e.clientY - rect.top <= rect.height / 6) {
        e.target.classList.remove('hover-bottom');
        e.target.classList.add('hover-top');
        // pushPosition = 'before';
      } else if (e.target.classList.contains('droppable')) {
        e.target.classList.add('hover-all');
        if (toggleTree) toggleTree();
        // pushPosition = 'inside';
      }
    },
    onDragEnter: (e: any) => {},
    onDragLeave: (e: any) => {
      while (e.target) {
        if (e.target.classList?.contains('tree')) {
          e.target.classList.remove('hover-selected');
          e.target.classList.remove('hover-all');
          e.target.classList.remove('hover-top');
          e.target.classList.remove('hover-bottom');
          break;
        }
        e.target = e.target.parentNode;
      }
    },
    onDragEnd: (e: any) => {
      e.target.style.opacity = 1;

      document.querySelectorAll('.hover-all').forEach((el) => {
        el.classList.remove('hover-all');
      });

      document.querySelectorAll('.hover-top').forEach((el) => {
        el.classList.remove('hover-top');
      });

      document.querySelectorAll('.hover-bottom').forEach((el) => {
        el.classList.remove('hover-bottom');
      });
    },
  };
};

export default dragDropEvent;

const div = document.createElement('div');
div.style.width = '15px';
div.style.height = '15px';
div.style.position = 'fixed';
div.style.top = '-50px';
div.style.borderRadius = '10%';
div.style.backgroundColor = '#4bcccc';
document.body.appendChild(div);
