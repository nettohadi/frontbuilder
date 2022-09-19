import React from 'react';
import { RESIZE_MARGIN } from '@src/constants';

let resizingType: 'width' | 'height' = 'width';
let widthDirection: 'right' | 'left' = 'right';
let heightDirection: 'bottom' | 'top' = 'bottom';

const Resizer = ({ setStyle, getRect, persistToLocalStorage }: any) => {
  const handleMouseMove = React.useCallback(
    (e: any) => {
      const rect = getRect();

      if (resizingType === 'width') {
        const newWidth = calculator.width(
          rect,
          widthDirection,
          e.clientX,
          e.clientY
        );
        setStyle((style: any) => ({ ...style, width: newWidth + 'px' }));
      } else {
        const newHeight = calculator.height(
          rect,
          heightDirection,
          e.clientX,
          e.clientY
        );
        setStyle((style: any) => ({ ...style, height: newHeight + 'px' }));
      }
    },
    [setStyle, getRect]
  );

  const handleMouseUp = React.useCallback(() => {
    document.body.style.cursor = 'default';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    persistToLocalStorage();
  }, [handleMouseMove, persistToLocalStorage]);

  const handleMouseDown = React.useCallback(
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  return (
    <>
      <span
        data-testid="top-height-resizer"
        onMouseDown={(e) => {
          resizingType = 'height';
          heightDirection = 'top';
          document.body.style.cursor = 'ns-resize';
          handleMouseDown(e);
        }}
        className="height-sizer button-edit"
        style={{
          left: 'calc(50% - 10px)',
          top: -5,
        }}
      />
      <span
        data-testid="bottom-height-resizer"
        onMouseDown={(e) => {
          resizingType = 'height';
          heightDirection = 'bottom';
          document.body.style.cursor = 'ns-resize';
          handleMouseDown(e);
        }}
        className="height-sizer button-edit"
        style={{
          left: 'calc(50% - 10px)',
          bottom: -5,
        }}
      />
      <span
        data-testid="right-width-resizer"
        onMouseDown={(e) => {
          resizingType = 'width';
          widthDirection = 'right';
          document.body.style.cursor = 'ew-resize';
          handleMouseDown(e);
        }}
        className="width-sizer button-edit"
        style={{
          right: -5,
          top: 'calc(50% - 15px)',
        }}
      />
      <span
        data-testid="left-width-resizer"
        onMouseDown={(e) => {
          resizingType = 'width';
          widthDirection = 'left';
          document.body.style.cursor = 'ew-resize';
          handleMouseDown(e);
        }}
        className="width-sizer button-edit"
        style={{
          left: -5,
          top: 'calc(50% - 15px)',
        }}
      />
    </>
  );
};

export default Resizer;

export const calculator = {
  width: (rect: any, direction: 'right' | 'left', clientX = 0, clientY = 0) => {
    if (direction === 'right') {
      return clientX - rect.left + RESIZE_MARGIN;
    } else {
      return rect.right - clientX + RESIZE_MARGIN;
    }
  },
  height: (
    rect: any,
    direction: 'bottom' | 'top',
    clientX = 0,
    clientY = 0
  ) => {
    if (direction === 'bottom') {
      return clientY - rect.top + RESIZE_MARGIN;
    } else {
      return rect.bottom - clientY + RESIZE_MARGIN;
    }
  },
};
