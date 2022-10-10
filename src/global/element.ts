import data from '@src/data';
import { ElementType, ParentType } from '@src/types';
import { current } from '@src/common/current';

export const updateElementStyle = (
  element: ElementType | null,
  newStyle: any
) => {
  if (!element) return element;
  element.props.style = { ...element.props.style, ...newStyle };
  data.persistToLocalStorage();
  return element;
};

export const updateElementProp = (
  element: ElementType | null,
  newProp: any
) => {
  if (!element) return element;
  element.props = { ...element.props, ...newProp };
  data.persistToLocalStorage();
  return element;
};

export const addChildElement = (
  element: ParentType,
  childElement: ElementType & string
) => {
  if (!element) return element;
  element.children.push(childElement);
  data.persistToLocalStorage();
  return element;
};

export const addChildElementBefore = (
  parentElement: ParentType,
  newElement: ElementType & string,
  targetIndex: number | undefined
) => {
  if (!parentElement) return parentElement;
  // @ts-ignore
  parentElement.children = parentElement.children.reduce(
    (acc: any, child: any, _index: number) => {
      if (_index === targetIndex) {
        acc.push(newElement, child);
      } else {
        acc.push(child);
      }
      return acc;
    },
    []
  );
  data.persistToLocalStorage();
  return parentElement;
};

export const addChildElementAfter = (
  parentElement: ParentType,
  newElement: ElementType & string,
  targetIndex: number | undefined
) => {
  if (!parentElement) return parentElement;
  // @ts-ignore
  parentElement.children = parentElement.children.reduce(
    (acc: any, child: any, _index: number) => {
      if (_index === targetIndex) {
        acc.push(child, newElement);
      } else {
        acc.push(child);
      }

      return acc;
    },
    []
  );
  data.persistToLocalStorage();
  return parentElement;
};

export const removeElement = (
  parentElement: ParentType,
  element: ElementType | null
) => {
  parentElement?.children.splice(
    parentElement.children.indexOf(element as any),
    1
  );
  current.setElement(null);
  data.persistToLocalStorage();
  return parentElement;
};
