// @ts-ignore
import * as lodashDebounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';
import { ElementType, getAllRegisteredElements } from '@frontbuilder/renderer';

import { SpacingType } from '@src/types';
import { RGBColor } from 'react-color';
import { current } from '@src/common/current';
import LogRocket from 'logrocket';

export const convertToNumber = (strValue: string | number) => {
  return Number(String(strValue).replace('px', '').replace('%', ''));
};

export const roundSize = (size: string) => {
  const unit = String(size).includes('px') ? 'px' : '%';
  const value = convertToNumber(size);
  return `${Math.round(value)}${unit}`;
};

export const extractSpacing = (value: string): SpacingType => {
  const strValue = String(value);
  const spacings = strValue.split(' ').map((s) => convertToNumber(s));

  const unit = strValue.includes('%') ? '%' : 'px';
  if (spacings.length === 1) {
    return {
      top: spacings[0],
      right: spacings[0],
      bottom: spacings[0],
      left: spacings[0],
      unit,
    };
  } else {
    return {
      top: spacings[0],
      right: spacings[1],
      bottom: spacings[2],
      left: spacings[3],
      unit,
    };
  }
};

export const assembleSpacing = (spacing: SpacingType) => {
  const { top, right, bottom, left, unit } = spacing;
  return `${top}${unit} ${right}${unit} ${bottom}${unit} ${left}${unit}`;
};

export const debounce = (func: any, timeOut: number = 1000) => {
  return lodashDebounce(func, timeOut);
};

export const showCaret = (el: any) => {
  const selection = window.getSelection();
  const range = document.createRange();
  selection?.removeAllRanges();
  range.selectNodeContents(el);
  range.collapse(false);
  selection?.addRange(range);
  el.focus();
};

export const getCommonPropGroups = () => {
  const contentProps = ['textContent'];

  const backgroundProps = [
    'backgroundColor',
    'backgroundImage',
    'backgroundSize',
    'backgroundRepeat',
    'backgroundPosition',
    'backgroundBlendMode',
  ];

  const displayProps = [
    'visibility',
    'flexDirection',
    'display',
    'alignItems',
    'justifyContent',
  ];

  const borderProps = [
    'border',
    'borderColor',
    'borderRadius',
    'borderStyle',
    'borderWidth',
    'borderTop',
    'borderTopColor',
  ];

  const spacingProps = [
    'padding',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'margin',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
  ];

  const sizeProps = [
    'width',
    'minWidth',
    'maxWidth',
    'height',
    'minHeight',
    'maxHeight',
  ];

  const imageProps = ['src', 'alt', 'objectFit', 'objectPosition'];
  const videoProps = [
    'videoSrc',
    'showControls',
    'autoPlay',
    'loop',
    'muted',
    'poster',
  ];

  const typographyProps = [
    'color',
    'fontSize',
    'fontWeight',
    'fontFamily',
    'fontStyle',
    'textTransform',
    'textDecoration',
    'textAlign',
    'lineHeight',
    'letterSpacing',
    'wordSpacing',
    'whiteSpace',
    'wordBreak',
    'textOverflow',
    'textShadow',
    'textIndent',
    'textJustify',
    'textRendering',
    'textShadow',
  ];

  const actionsProps = ['clickAction'];

  const headingTypeProps = ['headingType'];

  return {
    Display: displayProps,
    'Heading Type': headingTypeProps,
    Video: videoProps,
    Content: contentProps,
    Background: backgroundProps,
    Border: borderProps,
    Spacing: spacingProps,
    Size: sizeProps,
    Typography: typographyProps,
    Image: imageProps,
    Actions: actionsProps,
  };
};

export const rgbToString = (rgbObject: RGBColor) => {
  if (rgbObject.a === 1) {
    return rgbToHexString(rgbObject);
  } else {
    return rgbToRgbString(rgbObject);
  }
};

export const rgbToRgbString = (rgbObject: RGBColor) => {
  return `rgb(${rgbObject.r} ${rgbObject.g} ${rgbObject.b} / ${rgbObject.a})`;
};

export const rgbToHexString = (rgbObject: RGBColor) => {
  const r = rgbObject.r.toString(16);
  const g = rgbObject.g.toString(16);
  const b = rgbObject.b.toString(16);

  return `#${r}${g}${b}`;
};

export const stringToRgb = (stringColor: string = '') => {
  if (stringColor.includes('rgb')) {
    return rgbStringToRgb(stringColor);
  }

  if (stringColor.includes('#')) {
    return hexStringToRgb(stringColor);
  }

  return stringColor;
};

export const rgbStringToRgb = (stringColor: string = '') => {
  // convert rgb(0 0 0 / 0) to {r: 0, g: 0, b: 0, a: 0}
  if (stringColor.trim() === '') return;
  const rgbArray = stringColor
    .replace('rgb(', '')
    .replace(')', '')
    .replace('/ ', '')
    .split(' ');

  return {
    r: parseInt(rgbArray[0]),
    g: parseInt(rgbArray[1]),
    b: parseInt(rgbArray[2]),
    a: parseFloat(rgbArray[3]),
  };
};

export const hexStringToRgb = (stringColor: string = '') => {
  // convert #000000 to {r: 0, g: 0, b: 0}
  const hex = stringColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return {
    r,
    g,
    b,
    a: 1,
  };
};

export const getSelection = (): {
  start: number;
  end: number;
  parentNode?: ParentNode | null;
} => {
  const selection = window.getSelection();
  let range: any = { start: 0, end: 0 };
  if (selection?.rangeCount) {
    const rangeZero: Range = selection.getRangeAt(0);
    range.start = rangeZero.startOffset;
    range.end = rangeZero.endOffset;
    range.parentNode = rangeZero.commonAncestorContainer.parentNode;
  }
  return range;
};

export const sanitizeForUrl = (text: string) => {
  return String(text).replaceAll(/[^-a-zA-Z0-9]/g, '');
};

export function camelCaseToKebabCase(word: string) {
  return word.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export const getOnlyCssProps = (objectProps: any) => {
  const nonCssProps: string[] = ['fontWeight'];
  return Object.keys(objectProps).filter((prop) => !nonCssProps.includes(prop));
};

export const applyHoverEffect = (id: string) => {
  //remove previous hover effect
  document
    .querySelectorAll('.hover-selected')
    ?.forEach((el) => el.classList.remove('hover-selected'));

  document.getElementById(id)?.classList.add('hover-selected');
  document.getElementById(`tr-${id}`)?.classList.add('hover-selected');
};

export const removeHoverEffect = () => {
  removeClasses(['hover-selected']);
};

export const removeClasses = (classNames: string[]) => {
  classNames.forEach((className) => {
    document.querySelectorAll(`.${className}`)?.forEach((el) => {
      el.classList.remove(className);
    });
  });
};

export const goUpUntil = (element: HTMLElement, className: string = 'tree') => {
  while (element) {
    if (element.classList?.contains(className)) {
      break;
    }
    element = element.parentNode as HTMLElement;
  }
  return element;
};

export const copyElement = (
  element: ElementType | string | null,
  withNewUuid = false
) => {
  if (!element) return;

  const newElement = JSON.parse(JSON.stringify(element));
  if (withNewUuid) setNewUuid(newElement);
  return newElement;
};

const setNewUuid = (element: ElementType | string) => {
  if (!element || typeof element === 'string') return;

  element.uuid = uuidv4();
  if (element.children) {
    element.children.forEach((child) => setNewUuid(child));
  }
};

export const copyObject = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

export const validateColor = (strColor: string): string => {
  const style = new Option().style;
  style.color = strColor;
  return style.color;
};

export const scrollSelectedElementIntoView = () => {
  const selectedId = current.elementIdToScrollIntoView;
  const element = document.getElementById(selectedId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    current.elementIdToScrollIntoView = '';
  }
};

export const generateInitialsFromName = (fullName: string) => {
  if (!fullName) return '';

  const names = fullName.split(' ');
  if (names.length > 1) {
    return String(names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  }
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase() + names[0].charAt(1).toLowerCase();
  }

  return '';
};

export const getElements = () => {
  return getAllRegisteredElements();
};

export const getImageUrl = (imageName: string) => {
  if (imageName.includes('http')) return imageName;

  const baseUrl =
    'https://vhhpxskjmppjmqcrlarl.supabase.co/storage/v1/object/public/images';
  return `${baseUrl}/${current.user.id}/${current.website.id}/${imageName}`;
};

export const initializeLogRocket = () => {
  if (current.user?.email && current.user?.email !== 'hadi.syahbal@gmail.com') {
    console.log('init logRocket');
    LogRocket.init(process.env.REACT_APP_LOGROCKET_APP_ID as string);
    LogRocket.identify(current.user?.id, {
      name: current.user?.full_name,
      email: current.user?.email,
    });
  }
};

export const isValidText = (
  text: string,
  fieldName = 'Text',
  minCharsCount = 1
) => {
  if (text.length < minCharsCount) {
    return `${fieldName} must be at least ${minCharsCount} character(s)`;
  }

  if (String(text).trim().length === 0) {
    return `${fieldName} cannot be empty`;
  }
  return '';
};

export const isValidEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const isValid = emailRegex.test(email);
  if (String(email).trim().length === 0) {
    return 'Email cannot be empty';
  }

  if (!isValid) {
    return 'Please enter a valid email';
  }
  return '';
};

export const isValidPassword = (password: string) => {
  return isValidText(password, 'Password', 6);
};
