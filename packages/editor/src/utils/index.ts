import { FaHeading, FaParagraph, FaVideo } from 'react-icons/fa';
import { BsBorderOuter, BsImageFill } from 'react-icons/bs';
import { MdOutlineSmartButton } from 'react-icons/md';

import Box, { BoxElement } from '@src/components/Elements/Box';
import Button, { ButtonElement } from '@src/components/Elements/Button';
import withEditHandler, {
  ComponentWithHandlerProps,
} from '@src/pages/Editor/withEditHandler';
import { ElementType } from '@src/types';
// import ButtonIcon from '@src/pages/Editor/ElementContainer/ButtonIcon';
import Heading, { HeadingElement } from '@src/components/Elements/Heading';
import Paragraph, {
  ParagraphElement,
} from '@src/components/Elements/Paragraph';
import Image, { ImageElement } from '@src/components/Elements/Image';
import Video, { VideoElement } from '@src/components/Elements/Video';

type elementCollectionType = {
  [key: string]: {
    data: ElementType;
    component: ({ element, parent }: ComponentWithHandlerProps) => JSX.Element;
    icon?: any;
  };
};

// variable to store all registered elements
const elements: elementCollectionType = {};

export function registerElement(
  name: string,
  component: any,
  elementData: any = {},
  wrapper: (
    Component: any
  ) => ({ element, parent }: ComponentWithHandlerProps) => JSX.Element,
  icon?: any
) {
  elements[name] = {
    component: wrapper(component),
    data: elementData,
    icon,
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
    const className = String(elements[key].data.className);
    if (className.includes('droppable')) {
      droppableElements.push(JSON.parse(JSON.stringify(elements[key].data)));
    } else {
      nonDroppableElements.push(JSON.parse(JSON.stringify(elements[key].data)));
    }
    allElements.push(elements[key].data);
  });

  return { droppableElements, nonDroppableElements, allElements };
}

export const registerElements = (
  wrapper: (
    Component: any
  ) => ({ element, parent }: ComponentWithHandlerProps) => JSX.Element
) => {
  registerElement('Box', Box, BoxElement, wrapper, BsBorderOuter);
  registerElement(
    'Button',
    Button,
    ButtonElement,
    wrapper,
    MdOutlineSmartButton
  );
  registerElement('Heading', Heading, HeadingElement, wrapper, FaHeading);
  registerElement(
    'Paragraph',
    Paragraph,
    ParagraphElement,
    wrapper,
    FaParagraph
  );
  registerElement('Image', Image, ImageElement, wrapper, BsImageFill);
  registerElement('Video', Video, VideoElement, wrapper, FaVideo);
};
