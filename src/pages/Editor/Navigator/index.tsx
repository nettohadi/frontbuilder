import { HeadingContainer } from '@src/pages/Editor/shared';
import * as S from './styles';
import data from '@src/data';
import { ElementType, ParentType } from '@src/types';
import { getAllRegisteredElements } from '@src/utils';
import { RiArrowDownSFill, RiArrowRightSFill } from 'react-icons/ri';
import { current } from '@src/common/current';
import { useCallback, useContext, useEffect, useState } from 'react';
import mouseEvent from '@src/pages/Editor/Navigator/mouseEvent';
import dragDropEvent from '@src/pages/Editor/Navigator/dragDropEvent';
import PageData from '@src/context';

const Navigator = () => {
  const elementData = data.get();
  const elements = flatten(elementData as ElementType);
  return (
    <div>
      <HeadingContainer>Navigator</HeadingContainer>
      <S.NavigationContainer>
        <ElementsTree elementWrapper={elements} />
      </S.NavigationContainer>
    </div>
  );
};

export default Navigator;

const ElementsTree = ({
  elementWrapper,
}: {
  elementWrapper: ElementWrapper[];
}) => {
  const [closedElements, setClosedElements] = useState<string[]>(
    elementWrapper.map((e) => e.element.id).filter((id, index) => index > 0)
  );

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
  const isChildSelected = useCallback(
    (id: string) => {
      return !(currentElement?.id.startsWith(id) && id !== currentElement.id);
    },
    [currentElement]
  );

  useEffect(() => {
    setClosedElements((closedElements) =>
      closedElements.filter((id) => isChildSelected(id))
    );
  }, [currentElement, isChildSelected]);

  return (
    <>
      {elementWrapper.map((wrapper, index) => {
        const padding = index === 0 ? 2 : wrapper.element.id.length * 4;

        const currentElement = current.getElement() as ElementType;
        const isSelected = wrapper.element === currentElement;

        return (
          <S.Tree
            draggable={true}
            id={`tr-${wrapper.element.id}`}
            className={`tree ${
              wrapper.element.className?.includes('droppable')
                ? 'droppable'
                : ''
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
            key={index}
            isClosed={closedElements.some(
              (id) =>
                wrapper.element.id.startsWith(id) && id !== wrapper.element.id
            )}
          >
            <ToggleArrow
              toggleAble={wrapper.element.children.length > 0}
              isCollapsed={closedElements.includes(wrapper.element.id)}
              onClick={() => toggleElement(wrapper.element)}
            />
            {IconForType({ type: wrapper.element.type })()}
            {wrapper.element.props.name || 'Root'}
          </S.Tree>
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

const flatten = (elementTree: ElementType) => {
  const elementData: ElementWrapper[] = [];

  const flattenData = (
    element: ElementType,
    index = 0,
    parent?: ElementType | null
  ) => {
    const newElement = element;
    if (!newElement.id) return;

    newElement.id = `${parent?.id || '0'}.${index + 1}`;

    elementData.push({ parent, element: newElement });

    newElement.children.forEach((child, index) => {
      flattenData(child as ElementType, index, newElement);
    });
  };

  flattenData(elementTree);
  return elementData;
};

type ElementWrapper = {
  parent: ParentType;
  element: ElementType;
};
