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
import {
  copyObject,
  extractSpacing,
  showCaret,
} from '@src/utils/helperFunctions';
import ElementInfo from '@src/pages/Editor/ElementInfo';
import ContentEditMenu from '@src/pages/Editor/ContentEditMenu';
import styled from 'styled-components';
import global from '@src/global';
import {
  getHandlerClassNames,
  isCurrentlyResizing,
  overrideStyles,
} from '@src/pages/Editor/withEditHandler/helpers';

export interface ComponentWithHandlerProps {
  element: ElementType;
  parent: ParentType;
}

const WithEditHandler = (Component: any) => {
  const StyledComponent = styled(Component)<{ styles: any }>`
    ${({ styles }) => styles}
  `;

  const StyledHandler = styled.div<{ styles?: any }>`
    ${({ styles }) => styles || {}}
  `;

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

    const isSelected = current.uuid === element.uuid;

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

        // usually after undo or redo
        if (element !== current.getElement()) {
          current.setElement(element);
          current.setParent(parent);
          current.setRerender(updateThisComponent);
        }
      }
    }, [
      element.props.width,
      element.props.height,
      element,
      isSelected,
      updateThisComponent,
      parent,
    ]);

    useEffect(() => {
      // set initial selection
      if (!current.getElement() && !parent && rerender) {
        current.uuid = element.uuid;
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

    const newProps: any = copyObject(element.props);

    const { name, textContent, ...styles } = newProps;
    const { height, width, margin, minHeight } = styles;

    const inlineStyles = isCurrentlyResizing() ? { height, width } : {};
    const classStyles = isCurrentlyResizing() ? {} : { height, width };

    const wrapWithHandler = (children: any) => {
      return (
        <StyledHandler
          data-testid={generateHandlerTestId(element)}
          id={element.id}
          ref={wrapperRef}
          className={getHandlerClassNames(element)}
          {...commonEvent(element, parent, rerender, updateThisComponent)}
          {...draggableEvent(element, parent, rerender)}
          style={inlineStyles}
          styles={{ margin, minHeight, ...classStyles }}
        >
          <ElementInfo
            isSelected={isSelected}
            width={computedSize.width}
            height={computedSize.height}
          />
          {children}
          {isSelected && (
            <>
              <Resizer
                setProp={updateProp}
                getRect={getRect}
                showWidth={!element.hiddenProps?.includes('width')}
                showHeight={!element.hiddenProps?.includes('height')}
              />
              {parent && <QuickActions />}
              {showPadding && (
                <HighlightPadding
                  padding={extractSpacing(element.props.padding || '0px')}
                />
              )}
              {showMargin && (
                <HighlightMargin margin={extractSpacing(margin || '0px')} />
              )}
              <ContentEditMenu visible={isEditingTextContent} />
            </>
          )}
        </StyledHandler>
      );
    };

    return global.isEditMode ? (
      wrapWithHandler(
        <StyledComponent
          element={element}
          parent={parent}
          styles={overrideStyles(styles, element)}
        />
      )
    ) : (
      <StyledComponent
        element={element}
        parent={parent}
        styles={overrideStyles(styles, element)}
      />
    );
  };

  return NewComponent;
};

export default WithEditHandler;
