import React from 'react';

let isWidthSizing = true;

const Resizer = ({ setStyle, getRect }: any) => {
  const handleMouseMove = React.useCallback(
    (e: any) => {
      const rect = getRect();
      if (isWidthSizing) {
        const newWidth = e.clientX - rect.left;
        setStyle((style: any) => ({ ...style, width: newWidth }));
      } else {
        const newHeight = e.clientY - rect.top;
        setStyle((style: any) => ({ ...style, height: newHeight }));
      }
    },
    [setStyle, getRect]
  );

  const handleMouseUp = React.useCallback(() => {
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
        onMouseDown={(e) => {
          isWidthSizing = false;
          handleMouseDown(e);
        }}
        className="height-sizer button-edit"
        style={{
          left: 'calc(50% - 5px)',
          bottom: -5,
        }}
      ></span>
      <span
        onMouseDown={(e) => {
          isWidthSizing = true;
          handleMouseDown(e);
        }}
        className="width-sizer button-edit"
        style={{
          right: -5,
          top: 'calc(50% - 10px)',
        }}
      ></span>
    </>
  );
};

export default Resizer;
