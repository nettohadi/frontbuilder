import Box, { BoxElement } from '@components/Elements/Box';
import Button, { ButtonElement } from '@components/Elements/Button';
import withEditHandler, {
  ComponentWithHandlerProps,
} from '@src/pages/Editor/withEditHandler';
import { ElementType } from '@src/types';

type elementCollectionType = {
  [key: string]: {
    data: ElementType;
    component: ({ element, parent }: ComponentWithHandlerProps) => JSX.Element;
  };
};

// variable to store all registered elements
const elements: elementCollectionType = {};

export function registerElement(
  name: string,
  component: any,
  elementData: any = {}
) {
  elements[name] = {
    component: withEditHandler(component),
    data: elementData,
  };
}

export function getRegisteredElement(name: string) {
  return elements[name];
}

export function getAllRegisteredElements(): elementCollectionType {
  return elements;
}

export function getDropAndNonDropElements() {
  const elements = getAllRegisteredElements();
  let droppableElements: ElementType[] = [];
  let nonDroppableElements: ElementType[] = [];
  let allElements: ElementType[] = [];

  Object.keys(elements).forEach((key) => {
    const className = String(elements[key].data.props.className);
    if (className.includes('droppable')) {
      droppableElements.push(JSON.parse(JSON.stringify(elements[key].data)));
    } else {
      nonDroppableElements.push(JSON.parse(JSON.stringify(elements[key].data)));
    }
    allElements.push(elements[key].data);
  });

  return { droppableElements, nonDroppableElements, allElements };
}

registerElement('Box', Box, BoxElement);
registerElement('Button', Button, ButtonElement);
