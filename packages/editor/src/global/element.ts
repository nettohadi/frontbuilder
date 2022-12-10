import data from '@src/data';
import { ElementType, ParentType } from '@src/types';
import { current } from '@src/common/current';
import history from '@src/global/history';
import { copyElement } from '@src/utils/helperFunctions';

export const updateElementStyle = (
  element: ElementType | null,
  newStyle: any
) => {
  if (!element) return element;
  element.props.style = { ...element.props.style, ...newStyle };
  data.persistToCloud();
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
      _updateElementProp(element, newProp);
    });
  } else {
    _updateElementProp(element, newProp);
  }

  data.persistToCloud();
  return element;
};

const _updateElementProp = (element: ElementType | null, newProp: any) => {
  if (!element) return element;

  if (current.isTabletScreen) {
    element.props['mdScreen'] = {
      ...element.props?.mdScreen,
      ...newProp,
    };
  }

  if (current.isMobileScreen) {
    element.props['smScreen'] = {
      ...element.props?.smScreen,
      ...newProp,
    };
  }

  if (current.isDesktopScreen) {
    element.props = { ...element.props, ...newProp };
  }
};

export const addChildElement = (
  parentElement: ParentType,
  element: ElementType & string
) => {
  history.capture(() => _addChildElement(parentElement, element));

  data.refresh();
  data.persistToCloud();
  return parentElement;
};

const _addChildElement = (
  parentElement: ParentType,
  element: ElementType & string
) => {
  if (!parentElement) return parentElement;
  const newElement = copyElement(element);

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
  data.persistToCloud();
  return parentElement;
};

const _addChildElementBefore = (
  parentElement: ParentType,
  element: ElementType & string,
  targetIndex: number | undefined
) => {
  if (!parentElement) return parentElement;
  const newElement = copyElement(element);

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
  data.persistToCloud();
  return parentElement;
};

const _addChildElementAfter = (
  parentElement: ParentType,
  element: ElementType & string,
  targetIndex: number | undefined
) => {
  if (!parentElement) return parentElement;
  const newElement = copyElement(element);

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
  data.persistToCloud();
  return parentElement;
};

export const duplicateElement = (
  parentElement: ParentType,
  element: ElementType | null
) => {
  history.capture(() => {
    _duplicateElement(element);
  });

  data.refresh();
  data.persistToCloud();
  return parentElement;
};

const _duplicateElement = (element: ElementType | null) => {
  const parent = element?.getParent();
  if (!parent) return;

  const index = parent.children.indexOf(element as any);
  const duplicateElement: ElementType & string = copyElement(element, true);

  duplicateElement.getParent = () => null;

  _addChildElementAfter(parent, duplicateElement, index);
};

export const getProp = (element: ElementType | null, propName: string) => {
  if (!element) return null;

  if (current.isTabletScreen) {
    return (
      element.props?.mdScreen?.[propName] || element.props?.[propName] || ''
    );
  }

  if (current.isMobileScreen) {
    return (
      element.props?.smScreen?.[propName] ||
      element.props?.mdScreen?.[propName] ||
      element.props?.[propName] ||
      ''
    );
  }

  return element.props?.[propName] || '';
};
