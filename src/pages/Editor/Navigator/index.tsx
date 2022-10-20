import { HeadingContainer } from '@src/pages/Editor/shared';
import * as S from './styles';
import data from '@src/data';
import { ElementType } from '@src/types';
import { getAllRegisteredElements } from '@src/utils';
import { RiArrowDownSFill, RiArrowRightSFill } from 'react-icons/ri';
import { current } from '@src/common/current';
import { useEffect, useState } from 'react';
import {
  applyHoverEffect,
  removeHoverEffect,
} from '@src/utils/helperFunctions';

const Navigator = () => {
  const elementData = data.get();
  const elements = flatten(elementData as ElementType);
  return (
    <div>
      <HeadingContainer>Navigator</HeadingContainer>
      <S.NavigationContainer>
        <ElementsTree elements={elements} />
      </S.NavigationContainer>
    </div>
  );
};

export default Navigator;

const ElementsTree = ({ elements }: { elements: ElementType[] }) => {
  const [closedElements, setClosedElements] = useState<string[]>(
    elements.map((e) => e.id).filter((id, index) => index > 0)
  );

  const handleClick = (element: ElementType) => {
    element['select']();
  };

  const toggleElement = (element: ElementType) => {
    if (closedElements.includes(element.id)) {
      setClosedElements(closedElements.filter((id) => id !== element.id));
    } else {
      setClosedElements([...closedElements, element.id]);
    }
  };

  const currentElement = current.getElement() as ElementType;
  useEffect(() => {
    const checkClosedElement = () => {
      const filtered = closedElements.filter(
        (id) => !(currentElement?.id.startsWith(id) && id !== currentElement.id)
      );
      setClosedElements(filtered);
    };
    checkClosedElement();
  }, [currentElement, closedElements]);

  return (
    <>
      {elements.map((element, index) => {
        const padding = index === 0 ? 2 : element.id.length * 4;

        const currentElement = current.getElement() as ElementType;
        const isSelected = element === currentElement;

        return (
          <S.Tree
            draggable={true}
            id={`tr-${element.id}`}
            className={`tree ${isSelected ? 'selected' : ''}`}
            padding={padding}
            onClick={() => handleClick(element)}
            onMouseOver={() => applyHoverEffect(element.id)}
            onMouseOut={() => removeHoverEffect()}
            key={index}
            isClosed={closedElements.some(
              (id) => element.id.startsWith(id) && id !== element.id
            )}
          >
            <ToggleArrow
              toggleAble={element.hasChildren}
              isCollapsed={closedElements.includes(element.id)}
              onClick={() => toggleElement(element)}
            />
            {IconForType({ type: element.type })()}
            {element.props.name || 'Root'}
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
  const elements: ElementType[] = [];

  const flattenData = (
    element: ElementType,
    index = 0,
    parent?: ElementType | null
  ) => {
    const newElement = element;
    if (!newElement.id) return;

    newElement.id = `${parent?.id || '0'}.${index + 1}`;

    elements.push(newElement);

    newElement.hasChildren = newElement.children.length > 0 && true;

    newElement.children.forEach((child, index) => {
      flattenData(child as ElementType, index, newElement);
    });
  };

  flattenData(elementTree);
  return elements;
};
