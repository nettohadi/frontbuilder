import { FaHeading, FaParagraph, FaVideo } from "react-icons/fa";
import { BsBorderOuter, BsImageFill } from "react-icons/bs";
import { MdOutlineSmartButton } from "react-icons/md";

import Box, { BoxElement } from "../components/Elements/Box";
import Button, { ButtonElement } from "../components/Elements/Button";
import { ElementType } from "../types";

import Heading, { HeadingElement } from "../components/Elements/Heading";
import Paragraph, { ParagraphElement } from "../components/Elements/Paragraph";
import Image, { ImageElement } from "../components/Elements/Image";
import Video, { VideoElement } from "../components/Elements/Video";
import { MEASUREMENT } from "../constants";
import styled from "styled-components";
import { CSSProps } from "./cssProps";

type elementCollectionType = {
  [key: string]: {
    data: ElementType;
    component: ({ element, parent }: any) => JSX.Element;
    icon?: any;
  };
};

// variable to store all registered elements
const elements: elementCollectionType = {};

export function registerElement(
  name: string,
  Component: any,
  elementData: any = {},
  wrapper?: (Component: any) => ({ element, parent }: any) => JSX.Element,
  icon?: any
) {
  elements[name] = {
    component: wrapper?.(Component) || StyledComponent(Component),
    data: elementData,
    icon,
  };
}

const StyledComponent = (Component: any) => styled<any>(Component)`
  ${({ element }) => {
    const { name, textContent, mdScreen, smScreen, ...styles } = element.props;
    return getStyles(styles, mdScreen, smScreen);
  }};
`;

const getStyles = (styles: any, mdStyles: any, smStyles: any) => {
  const _styles = removeNonCSSProps(styles);
  const _mdStyles = removeNonCSSProps(mdStyles);
  const _smStyles = removeNonCSSProps(smStyles);

  return {
    ..._styles,
    [`@media (max-width: ${MEASUREMENT.TABLET_SCREEN})`]: _mdStyles,
    [`@media (max-width: ${MEASUREMENT.MOBILE_SCREEN})`]: _smStyles,
  };
};

export const removeNonCSSProps = (styles: any) => {
  if (!styles) return {};
  const newStyles: any = {};

  Object.keys(styles).forEach((key) => {
    if (CSSProps.includes(key)) {
      newStyles[key] = styles[key];
    }
  });

  return newStyles;
};

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
    if (className.includes("droppable")) {
      droppableElements.push(JSON.parse(JSON.stringify(elements[key].data)));
    } else {
      nonDroppableElements.push(JSON.parse(JSON.stringify(elements[key].data)));
    }
    allElements.push(elements[key].data);
  });

  return { droppableElements, nonDroppableElements, allElements };
}

export const registerElements = (
  wrapper?: (Component: any) => ({ element, parent }: any) => JSX.Element
) => {
  console.log("Registering elements", { wrapper });

  registerElement("Box", Box, BoxElement, wrapper, BsBorderOuter);
  registerElement(
    "Button",
    Button,
    ButtonElement,
    wrapper,
    MdOutlineSmartButton
  );
  registerElement("Heading", Heading, HeadingElement, wrapper, FaHeading);
  registerElement(
    "Paragraph",
    Paragraph,
    ParagraphElement,
    wrapper,
    FaParagraph
  );
  registerElement("Image", Image, ImageElement, wrapper, BsImageFill);
  registerElement("Video", Video, VideoElement, wrapper, FaVideo);
};
