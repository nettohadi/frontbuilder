import { ElementType } from '@src/types';
import {
  applyHoverEffect,
  removeHoverEffect,
} from '@src/utils/helperFunctions';
import { current } from '@src/common/current';

const mouseEvent = (element: ElementType) => {
  const handleClick = (element: ElementType) => {
    if (element.select) element.select();
    current.elementIdToScrollIntoView = `${element.id}`;
  };

  return {
    onClick: (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      handleClick(element);
    },
    onMouseOver: (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      applyHoverEffect(element.id);
    },
    onMouseOut: (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      removeHoverEffect();
    },
  };
};

export default mouseEvent;
