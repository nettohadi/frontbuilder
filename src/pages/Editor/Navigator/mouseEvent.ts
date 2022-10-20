import { ElementType } from '@src/types';
import {
  applyHoverEffect,
  removeHoverEffect,
} from '@src/utils/helperFunctions';

const mouseEvent = (element: ElementType) => {
  const handleClick = (element: ElementType) => {
    if (element.select) element.select();
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
