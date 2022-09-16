import React, { useContext } from 'react';
import { commonEvent, draggableEvent } from '../events';
import Resizer from '../Resizer';
import data from '@src/data';
import { current } from '@src/common/current';
import PageData from '@src/context';

const WithEditHandler = (Component: any) => {
  const NewComponent = ({ element, parent }: any) => {
    const rerender = useContext(PageData);
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

    const isSelected = current.getElement() === element;

    return (
      <div
        data-testid="edit-handler-wrapper"
        ref={wrapperRef}
        className={`selectable ${
          element.props.className
        } edit-handler-wrapper ${isSelected ? 'selected' : ''}`}
        {...commonEvent(element, parent, rerender)}
        {...draggableEvent(element, parent, rerender)}
        style={style}
      >
        <Component element={element} parent={parent} />
        {isSelected && (
          <Resizer
            setStyle={setStyle}
            getRect={getRect}
            persistToLocalStorage={() => persistToLocalStorage()}
          />
        )}
      </div>
    );
  };

  return NewComponent;
};

export default WithEditHandler;
