import React, { useContext } from 'react';
import { commonEvent, draggableEvent } from '../events';
import Resizer from '../Resizer';
import QuickActions from '../QuickActions';
import data from '@src/data';
import { current } from '@src/common/current';
import PageData from '@src/context';
import { ElementType, ParentType } from '@src/types';
import { generateHandlerTestId } from '@src/utils/tests';
import { useRender } from '@src/hooks';

export interface ComponentWithHandlerProps {
  element: ElementType;
  parent: ParentType;
}

const WithEditHandler = (Component: any) => {
  const NewComponent = ({ element, parent }: ComponentWithHandlerProps) => {
    const rerender = useContext(PageData);
    const updateThisComponent = useRender();
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const getRect = () => {
      return wrapperRef.current
        ? wrapperRef.current.getBoundingClientRect()
        : null;
    };

    const persistToLocalStorage = () => {
      // save data to local storage
      data.persistToLocalStorage();
    };

    const isSelected = current.getElement() === element;

    const updateStyle = (newStyle: any) => {
      element.props.style = { ...element.props.style, ...newStyle };
      updateThisComponent();
    };

    return (
      <div
        data-testid={generateHandlerTestId(element)}
        id={element.id}
        ref={wrapperRef}
        className={`selectable ${
          element.props.className
        } edit-handler-wrapper ${isSelected ? 'selected' : ''}`}
        {...commonEvent(element, parent, rerender, updateThisComponent)}
        {...draggableEvent(element, parent, rerender)}
        style={{
          height: element.props.style.height,
          width: element.props.style.width,
        }}
      >
        <Component element={element} parent={parent} />
        {isSelected && (
          <>
            <Resizer
              setStyle={updateStyle}
              getRect={getRect}
              persistToLocalStorage={() => persistToLocalStorage()}
            />
            {parent && <QuickActions />}
          </>
        )}
      </div>
    );
  };

  return NewComponent;
};

export default WithEditHandler;
