import React, { useContext } from 'react';
import { commonEvent, draggableEvent } from '../events';
import Resizer from '../Resizer';
import QuickActions from '../QuickActions';
import { current } from '@src/common/current';
import PageData from '@src/context';
import { ElementType, ParentType } from '@src/types';
import { generateHandlerTestId } from '@src/utils/tests';
import { useRender } from '@src/hooks';
import { updateElementStyle } from '@src/global/element';
import HighlightPadding from '@src/pages/Editor/Spacing/HighlightPadding';
import HighlightMargin from '@src/pages/Editor/Spacing/HighlightMargin';

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

    const isSelected = current.getElement() === element;

    const updateStyle = (newStyle: any) => {
      console.log('withEditHandler');
      updateElementStyle(element, newStyle);
      updateThisComponent();
    };

    const showPadding = current.getHighlightPadding();
    const showMargin = current.getHighlightMargin();

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
          margin: element.props.style.margin || 0,
        }}
      >
        <Component element={element} parent={parent} />
        {isSelected && (
          <>
            <Resizer setStyle={updateStyle} getRect={getRect} />
            {parent && !showPadding && !showMargin && <QuickActions />}
            {showPadding && (
              <HighlightPadding
                getRect={getRect}
                padding={element.props.style.padding || 0}
              />
            )}
            {showMargin && (
              <HighlightMargin
                getRect={getRect}
                Wrapper={wrapperRef.current}
                margin={element.props.style.margin || 0}
              />
            )}
          </>
        )}
      </div>
    );
  };

  return NewComponent;
};

export default WithEditHandler;
