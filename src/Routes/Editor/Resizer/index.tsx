import React from 'react';
import { commonEvent } from '@src/Routes/Editor/events';

const Resizer = (Component: any) => {
  const NewComponent = ({ element, parent }: any) => {
    const [style, setStyle] = React.useState({ width: 0, height: 0 });
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      setStyle(element.props.style);
    }, [element]);

    const getRect = () => {
      return wrapperRef.current
        ? wrapperRef.current.getBoundingClientRect()
        : null;
    };

    return (
      <div
        id={'1231'}
        ref={wrapperRef}
        className={`selectable ${element.props.className}`}
        {...commonEvent(element, parent)}
        style={{ width: style.width, height: style.height }}
      >
        <Component element={element} parent={parent} />
        <Controls setStyle={setStyle} getRect={getRect} />
      </div>
    );
  };
  return NewComponent;
};

export default Resizer;

let isWidthSizing = true;

const Controls = ({ setStyle, getRect }: any) => {
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
