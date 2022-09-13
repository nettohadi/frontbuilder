import React from 'react';
import { commonEvent } from '../events';
import Resizer from '../Resizer';

const WithEditHandler = (Component: any) => {
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
        data-testid="edit-handler-wrapper"
        ref={wrapperRef}
        className={`selectable ${element.props.className} edit-handler-wrapper`}
        {...commonEvent(element, parent)}
        style={{ width: style.width, height: style.height }}
      >
        <Component element={element} parent={parent} />
        <Resizer setStyle={setStyle} getRect={getRect} />
      </div>
    );
  };

  return NewComponent;
};

export default WithEditHandler;
