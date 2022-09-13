import React from 'react';
import { RESIZE_MARGIN } from '@src/constants';

let resizingType: 'width' | 'height' = 'width';
let widthDirection: 'right' | 'left' = 'right';
let heightDirection: 'bottom' | 'top' = 'bottom';

const Resizer = ({ setStyle, getRect }: any) => {
  const handleMouseMove = React.useCallback(
    (e: any) => {
      const rect = getRect();
      if (resizingType === 'width') {
        let newWidth = 0;
        if (widthDirection === 'right') {
          newWidth = e.clientX - rect.left + RESIZE_MARGIN;
        } else {
          newWidth = rect.right - e.clientX + RESIZE_MARGIN;
        }
        setStyle((style: any) => ({ ...style, width: newWidth }));
      } else {
        let newHeight = 0;
        if (heightDirection === 'bottom') {
          newHeight = e.clientY - rect.top + RESIZE_MARGIN;
        } else {
          newHeight = rect.bottom - e.clientY + RESIZE_MARGIN;
        }

        setStyle((style: any) => ({ ...style, height: newHeight }));
      }
    },
    [setStyle, getRect]
  );

  const handleMouseUp = React.useCallback(() => {
    document.body.style.cursor = 'default';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

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
