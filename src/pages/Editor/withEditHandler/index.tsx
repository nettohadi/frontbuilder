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
import ElementInfo from '@src/pages/Editor/ElementInfo';
import ContentEditMenu from '@src/pages/Editor/ContentEditMenu';

export interface ComponentWithHandlerProps {
  element: ElementType;
  parent: ParentType;
}

const WithEditHandler = (Component: any) => {
  const NewComponent = ({ element, parent }: ComponentWithHandlerProps) => {
    const rerender = useContext(PageData);
    const updateThisComponent = useRender();
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [computedSize, setComputedSize] = React.useState<{
      width: string;
      height: string;
    }>({ width: '', height: '' });

    const getRect = () => {
      return wrapperRef.current
        ? wrapperRef.current.getBoundingClientRect()
        : null;
    };

    const isSelected = current.getElement() === element;

    const updateProp = (newProp: any, undoAble: boolean = true) => {
      updateElementProp(element, newProp, undoAble);
      updateThisComponent();
    };

    const showPadding = true;
    const showMargin = true;

    useEffect(() => {
      // sync node computed style with element props
      const computedStyle = wrapperRef.current
        ? getComputedStyle(wrapperRef.current)
        : null;

      if (!computedStyle) return;
      const computedWidth = computedStyle.width;
      const computedHeight = computedStyle.height;

      if (isSelected) {
        setComputedSize({ width: computedWidth, height: computedHeight });
      }
    }, [
      element.props.width,
      element.props.height,
      element,
      isSelected,
      rerender,
    ]);

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
      const isEditingTextContent = current.isEditingTextContent();

      if (wrapperRef.current) {
        const childElement = wrapperRef.current.children[0] as HTMLElement;
        childElement.contentEditable = String(
          isSelected && isEditingTextContent
        );

        if (isSelected && isEditingTextContent) showCaret(childElement);
      }
    }, [isEditingTextContent, isSelected]);

    return (
      <div
        data-testid={generateHandlerTestId(element)}
        id={element.id}
        ref={wrapperRef}
        className={`selectable ${element.className} edit-handler-wrapper ${
          isSelected ? 'selected' : ''
        } ${
          element.props.flexDirection
            ? 'direction-' + element.props.flexDirection
            : ''
        }`}
        {...commonEvent(element, parent, rerender, updateThisComponent)}
        {...draggableEvent(element, parent, rerender)}
        style={{
          height: element.props.height,
          width: element.props.width,
          margin: element.props.margin || 0,
        }}
      >
        <ElementInfo
          isSelected={isSelected}
          width={computedSize.width}
          height={computedSize.height}
        />
        <Component element={element} parent={parent} />
        {isSelected && (
          <>
            <Resizer setProp={updateProp} getRect={getRect} />
            {parent && <QuickActions />}
            {showPadding && (
              <HighlightPadding
                padding={extractSpacing(element.props.padding || '0px')}
              />
            )}
            {showMargin && (
              <HighlightMargin
                margin={extractSpacing(element.props.margin || '0px')}
              />
            )}
            <ContentEditMenu visible={isEditingTextContent} />
          </>
        )}
      </div>
    );
  };

  return NewComponent;
};

export default WithEditHandler;
