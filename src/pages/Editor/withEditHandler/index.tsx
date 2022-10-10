import React, { useContext, useEffect } from 'react';

import { commonEvent, draggableEvent } from '../events';
import Resizer from '../Resizer';
import QuickActions from '../QuickActions';
import { current } from '@src/common/current';
import PageData from '@src/context';
import { ElementType, ParentType } from '@src/types';
import { generateHandlerTestId } from '@src/utils/tests';
import { useRender } from '@src/hooks';
import { updateElementProp } from '@src/global/element';
import HighlightPadding from '@src/pages/Editor/Spacing/HighlightPadding';
import HighlightMargin from '@src/pages/Editor/Spacing/HighlightMargin';
import { extractSpacing, showCaret } from '@src/utils/helperFunctions';

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

    const updateProp = (newProp: any) => {
      updateElementProp(element, newProp);
      updateThisComponent();
    };

    const showPadding = current.getHighlightPadding();
    const showMargin = current.getHighlightMargin();

    useEffect(() => {
      // set initial selection
      if (!current.getElement() && !parent && rerender) {
        current.setElement(element);
        current.setParent(null);
        current.setRerender(updateThisComponent);
        rerender();
      }
    }, [element, parent, rerender, updateThisComponent]);

    const isEditingTextContent = current.isEditingTextContent();
    useEffect(() => {
      if (wrapperRef.current) {
        const childElement = wrapperRef.current.children[0] as HTMLElement;
        childElement.contentEditable = String(
          isSelected && current.isEditingTextContent()
        );
        if (isSelected && current.isEditingTextContent())
          showCaret(childElement);
      }
    }, [isEditingTextContent, isSelected]);

    return (
      <div
        data-testid={generateHandlerTestId(element)}
        id={element.id}
        ref={wrapperRef}
        className={`selectable ${element.className} edit-handler-wrapper ${
          isSelected ? 'selected' : ''
        }`}
        {...commonEvent(element, parent, rerender, updateThisComponent)}
        {...draggableEvent(element, parent, rerender)}
        style={{
          height: element.props.height,
          width: element.props.width,
          margin: element.props.margin || 0,
        }}
      >
        <Component element={element} parent={parent} />
        {isSelected && (
          <>
            <Resizer setProp={updateProp} getRect={getRect} />
            {parent && !showPadding && !showMargin && <QuickActions />}
            {showPadding && (
              <HighlightPadding
                getRect={getRect}
                padding={extractSpacing(element.props.padding || '0px')}
              />
            )}
            {showMargin && (
              <HighlightMargin
                getRect={getRect}
                margin={extractSpacing(element.props.margin || '0px')}
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
