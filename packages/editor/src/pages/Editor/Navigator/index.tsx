import { getAllRegisteredElements } from '@frontbuilder/renderer';
import { ElementType, ParentType } from '@frontbuilder/renderer';

import { HeadingContainer } from '@src/pages/Editor/shared';
import * as S from './styles';
import data from '@src/data';
import { RiArrowDownSFill, RiArrowRightSFill } from 'react-icons/ri';
import { current } from '@src/common/current';
import { useCallback, useContext, useEffect, useState } from 'react';
import mouseEvent from '@src/pages/Editor/Navigator/mouseEvent';
import dragDropEvent from '@src/pages/Editor/Navigator/dragDropEvent';
import PageData from '@src/context';
import { scrollSelectedElementIntoView } from '@src/utils/helperFunctions';

const Navigator = () => {
  const elementData = data.get();
  const [treeData, setTreeData] = useState<ElementWrapper[]>([]);

  useEffect(() => {
    setTreeData(flatten(elementData as ElementType & string));
  }, [elementData]);

  return (
    <S.NavigatorContainer>
      <HeadingContainer>Navigator</HeadingContainer>
      <S.TreeContainer>
        <ElementsTree elementWrapper={treeData} />
      </S.TreeContainer>
    </S.NavigatorContainer>
  );
};

export default Navigator;

const ElementsTree = ({
  elementWrapper,
}: {
  elementWrapper: ElementWrapper[];
}) => {
  const [closedElements, setClosedElements] = useState<string[]>([]);

  const rerender = useContext(PageData);

  const toggleElement = (element: ElementType) => {
    if (closedElements.includes(element.id)) {
      setClosedElements(closedElements.filter((id) => id !== element.id));
    } else {
      setClosedElements([...closedElements, element.id]);
    }
  };

  const expandTree = (element: ElementType, isOpen: boolean = true) => {
    if (!isOpen) {
      setClosedElements([...closedElements, element.id]);
      return;
    }
    if (closedElements.includes(element.id)) {
      setClosedElements(closedElements.filter((id) => id !== element.id));
    }
  };

  const currentElement = current.getElement() as ElementType;
  const isChildSelected = useCallback((parentId: string, childId: string) => {
    return (
      childId.startsWith(parentId) &&
      childId.charAt(parentId.length) === '.' &&
      parentId !== childId
    );
  }, []);

  useEffect(() => {
    setClosedElements((closedElements) =>
      closedElements.filter((id) => !isChildSelected(id, currentElement.id))
    );
  }, [currentElement, isChildSelected, elementWrapper]);

  useEffect(() => {
    scrollSelectedElementIntoView();
  }, [closedElements]);

  return (
    <>
      {elementWrapper.map((wrapper, index) => {
        const padding =
          index === 0 ? 2 : wrapper.element.id.split('.').length * 4;

        const currentElement = current.getElement() as ElementType;
        const isSelected = wrapper.element === currentElement;

        const isClosed =
          current.elementIdToScrollIntoView === `tr-${wrapper.element.id}`
            ? false
            : closedElements.some((id) =>
                isChildSelected(id, wrapper.element.id)
              );

        const isCollapsed = closedElements.includes(wrapper.element.id);
        return (
          <Tree
            wrapper={wrapper}
            expandTree={expandTree}
            toggleElement={toggleElement}
            isSelected={isSelected}
            rerender={rerender}
            padding={padding}
            isClosed={isClosed}
            isCollapsed={isCollapsed}
          />
        );
      })}
    </>
  );
};

const ToggleArrow = ({
  toggleAble,
  isCollapsed,
  onClick,
}: {
  toggleAble: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}) => {
  const ToggleIcon = ({ isCollapsed }: { isCollapsed: boolean }) =>
    isCollapsed ? (
      <RiArrowRightSFill size={16} />
    ) : (
      <RiArrowDownSFill size={16} />
    );

  return (
    <div
      onClick={(e: any) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      style={{ width: 16, height: 16 }}
    >
      {toggleAble && <ToggleIcon isCollapsed={isCollapsed} />}
    </div>
  );
};

const allElements = getAllRegisteredElements();
const IconForType = ({ type }: { type: string }) => {
  return allElements[type].icon || <div></div>;
};

const flatten = (elementTree: ElementType & string) => {
  const elementData: ElementWrapper[] = [];

  const flattenData = (
    element: ElementType & string,
    index = 0,
    parent?: ElementType | null
  ) => {
    const newElement = element;
    if (!newElement.id) return;

    elementData.push({ parent, element: newElement });

    newElement.children.forEach((child, index) => {
      flattenData(child as ElementType & string, index, newElement);
    });
  };

  flattenData(elementTree);
  return elementData;
};

type ElementWrapper = {
  parent: ParentType;
  element: ElementType & string;
};

const Tree = ({
  wrapper,
  expandTree,
  toggleElement,
  isSelected,
  rerender,
  padding,
  isClosed,
  isCollapsed,
}: {
  wrapper: ElementWrapper;
  expandTree: any;
  toggleElement: any;
  isSelected: boolean;
  rerender: any;
  padding: number;
  isClosed: boolean;
  isCollapsed: boolean;
}) => {
  return (
    <S.Tree
      draggable={true}
      id={`tr-${wrapper.element.id}`}
      className={`tree ${
        wrapper.element.className?.includes('droppable') ? 'droppable' : ''
      } ${isSelected ? 'selected' : ''}`}
      data-id={wrapper.element.id}
      padding={padding}
      {...mouseEvent(wrapper.element)}
      {...dragDropEvent(
        wrapper.element,
        (isOpen: boolean = true) => {
          expandTree(wrapper.element, isOpen);
        },
        rerender,
        wrapper.parent
      )}
      isClosed={isClosed}
    >
      <ToggleArrow
        toggleAble={wrapper.element.children.length > 0}
        isCollapsed={isCollapsed}
        onClick={() => toggleElement(wrapper.element)}
      />
      {IconForType({ type: wrapper.element.type })()}
      {wrapper.element.props.name || 'Root'}
    </S.Tree>
  );
};
