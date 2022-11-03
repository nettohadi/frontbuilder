import data from '@src/data';
import { ElementType, ParentType } from '@src/types';
import { current } from '@src/common/current';
import history from '@src/global/history';
import { copyObject } from '@src/utils/helperFunctions';

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
  newProp: any,
  undoAble: boolean = true
) => {
  if (!element) return element;

  if (undoAble) {
    history.capture(() => {
      element.props = { ...element.props, ...newProp };
    });
  } else {
    element.props = { ...element.props, ...newProp };
  }

  data.persistToLocalStorage();
  return element;
};

export const addChildElement = (
  parentElement: ParentType,
  element: ElementType & string
) => {
  history.capture(() => _addChildElement(parentElement, element));

  data.refresh();
  data.persistToLocalStorage();
  return parentElement;
};

const _addChildElement = (
  parentElement: ParentType,
  element: ElementType & string
) => {
  if (!parentElement) return parentElement;
  const newElement = copyObject(element);

  parentElement.children.push(newElement);

  // remove element from its previous position
  const originalParent = element.getParent();
  if (originalParent) {
    originalParent.children.splice(
      originalParent.children.indexOf(element as any),
      1
    );
  }
};

export const addChildElementBefore = (
  parentElement: ParentType,
  element: ElementType & string,
  targetIndex: number | undefined
) => {
  history.capture(() => {
    _addChildElementBefore(parentElement, element, targetIndex);
  });

  data.refresh();
  data.persistToLocalStorage();
  return parentElement;
};

const _addChildElementBefore = (
  parentElement: ParentType,
  element: ElementType & string,
  targetIndex: number | undefined
) => {
  if (!parentElement) return parentElement;
  const newElement = copyObject(element);

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

  // remove element from its previous position
  const originalParent = element.getParent();
  if (originalParent) {
    originalParent.children.splice(
      originalParent.children.indexOf(element as any),
      1
    );
  }
};

export const addChildElementAfter = (
  parentElement: ParentType,
  element: ElementType & string,
  targetIndex: number | undefined
) => {
  history.capture(() => {
    _addChildElementAfter(parentElement, element, targetIndex);
  });

  data.refresh();
  data.persistToLocalStorage();
  return parentElement;
};

const _addChildElementAfter = (
  parentElement: ParentType,
  element: ElementType & string,
  targetIndex: number | undefined
) => {
  if (!parentElement) return parentElement;
  const newElement = copyObject(element);

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

  // remove element from its previous position
  const originalParent = element.getParent();
  if (originalParent) {
    originalParent.children.splice(
      originalParent.children.indexOf(element as any),
      1
    );
  }
};

export const removeElement = (
  parentElement: ParentType,
  element: ElementType | null
) => {
  history.capture(() => {
    parentElement?.children.splice(
      parentElement.children.indexOf(element as any),
      1
    );
  });

  current.setElement(null);
  data.refresh();
  data.persistToLocalStorage();
  return parentElement;
};

export const duplicateElement = (
  parentElement: ParentType,
  element: ElementType | null
) => {
  history.capture(() => {
    _duplicateElement(parentElement, element);
  });

  data.refresh();
  data.persistToLocalStorage();
  return parentElement;
};

const _duplicateElement = (
  parentElement: ParentType,
  element: ElementType | null
) => {
  if (!parentElement) return parentElement;

  const index = parentElement.children.indexOf(element as any);
  const duplicateElement: ElementType & string = JSON.parse(
    JSON.stringify(element)
  );

  duplicateElement.getParent = () => null;

  _addChildElementAfter(parentElement, duplicateElement, index);
};
