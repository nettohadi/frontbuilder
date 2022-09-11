import { current } from '@src/common/current';
import { ElementType } from '@src/types';

export const commonEvent = (
  element: ElementType,
  parent: ElementType | null
) => ({
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

    if (
      e.target.classList.contains('row') ||
      e.target.classList.contains('column')
    ) {
      // e.target.style.border = 'grey dotted 2px';
      return;
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
});
