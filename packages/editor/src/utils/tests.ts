import { ElementType } from '@frontbuilder/renderer';

export const generateHandlerTestId = (
  element: ElementType,
  withTestAttr = false
) => {
  const id = `edit-handler-wrapper${
    String(element.id).length ? '-' : ''
  }${String(element.id)}`;

  return withTestAttr ? `[data-testid="${id}"]` : id;
};

export const generateElementTestId = (
  element: ElementType,
  withTestAttr = false
) => {
  const id = `element-${element.type}`;
  return withTestAttr ? `[data-testid="${id}"]` : id;
};
