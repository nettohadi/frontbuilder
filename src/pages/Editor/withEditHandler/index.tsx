import React from 'react';
import { commonEvent } from '../events';
import Resizer from '../Resizer';
import data from '@src/data';

const WithEditHandler = (Component: any) => {
  const NewComponent = ({ element, parent }: any) => {
    const [style, setStyle] = React.useState({
      width: element.props.style.width,
      height: element.props.style.height,
    });
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const getRect = () => {
      return wrapperRef.current
        ? wrapperRef.current.getBoundingClientRect()
        : null;
    };

    React.useEffect(() => {
      element.props.style = { ...element.props.style, ...style };
    }, [style, element]);

    const persistToLocalStorage = () => {
      // save data to local storage
      data.persistToLocalStorage();
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
        <Resizer
          setStyle={setStyle}
          getRect={getRect}
          persistToLocalStorage={() => persistToLocalStorage()}
        />
      </div>
    );
  };

  return NewComponent;
};

export default WithEditHandler;
