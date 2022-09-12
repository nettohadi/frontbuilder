import { current } from '@src/common/current';
import { ElementType } from '@src/types';
import global from '@src/global';

export const commonEvent = (
  element: ElementType,
  parent: ElementType | null
) => {
  if (!global.getEditMode()) return {};
  return {
    onMouseOver: (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.classList.contains('selectable')) {
        e.target.classList.add('hover-selected');
      }
    },
    onMouseOut: (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.classList.contains('selectable')) {
        e.target.classList.remove('hover-selected');
        e.target.classList.remove('hover-all');
        e.target.classList.remove('hover-left');
        e.target.classList.remove('hover-right');
      }
    },
    onClick: (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      if (!e.target.classList.contains('selectable')) return;

      current.setElement(element);
      current.setParent(parent);
      current.setNode(e.target);
      // e.target.style.border = '#8b3dff solid 2px';

      console.log({
        element: current.getElement(),
        parent: current.getParent(),
        node: current.getNode(),
        rerender: current.getRerender(),
      });

      if (current.getRerender()) current.getRerender()();
      // currentIndex = index;
      // rerender();
      // setStyle(getCurrentStyle());
    },
  };
};
