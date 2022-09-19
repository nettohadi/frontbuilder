import { ElementType } from '@src/types';

export const generateHandlerTestId = (
  element: ElementType,
  withTestAttr = false
) => {
  const id = `edit-handler-wrapper${
    String(element.id).length ? '-' : ''
  }${String(element.id)}`;

  return withTestAttr ? `[data-testid="${id}"]` : id;
};
