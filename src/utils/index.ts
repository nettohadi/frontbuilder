import { FaHeading, FaParagraph, FaVideo } from 'react-icons/fa';
import { BsBorderOuter, BsImageFill } from 'react-icons/bs';
import { MdOutlineSmartButton } from 'react-icons/md';

import Box, { BoxElement } from '@components/Elements/Box';
import Button, { ButtonElement } from '@components/Elements/Button';
import withEditHandler, {
  ComponentWithHandlerProps,
} from '@src/pages/Editor/withEditHandler';
import { ElementType } from '@src/types';
// import ButtonIcon from '@src/pages/Editor/ElementContainer/ButtonIcon';
import Heading, { HeadingElement } from '@components/Elements/Heading';
import Paragraph, { ParagraphElement } from '@components/Elements/Paragraph';
import Image, { ImageElement } from '@components/Elements/Image';
import Video, { VideoElement } from '@components/Elements/Video';

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
  icon?: any
) {
  elements[name] = {
    component: withEditHandler(component),
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

registerElement('Box', Box, BoxElement, BsBorderOuter);
registerElement('Button', Button, ButtonElement, MdOutlineSmartButton);
registerElement('Heading', Heading, HeadingElement, FaHeading);
registerElement('Paragraph', Paragraph, ParagraphElement, FaParagraph);
registerElement('Image', Image, ImageElement, BsImageFill);
registerElement('Video', Video, VideoElement, FaVideo);
