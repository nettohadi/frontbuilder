// @ts-ignore
import * as lodashDebounce from 'lodash.debounce';
import { SpacingType } from '@src/types';
import { RGBColor } from 'react-color';

export const convertToNumber = (strValue: string | number) => {
  return Number(String(strValue).replace('px', '').replace('%', ''));
};

export const roundSize = (size: string) => {
  const unit = String(size).includes('px') ? 'px' : '%';
  const value = convertToNumber(size);
  return `${Math.round(value)}${unit}`;
};

export const extractSpacing = (value: string): SpacingType => {
  const spacings = value.split(' ').map((s) => convertToNumber(s));
  const unit = value.includes('%') ? '%' : 'px';
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

export const debounce = (func: any, timeOut: number = 500) => {
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
  ];

  const displayProps = [
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

  return {
    Display: displayProps,
    Content: contentProps,
    Background: backgroundProps,
    Border: borderProps,
    Spacing: spacingProps,
    Size: sizeProps,
    Typography: typographyProps,
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
    console.log({ selection });
    const commonContainer = rangeZero.commonAncestorContainer;
    const endContainer = rangeZero.endContainer;
    const startContainer = rangeZero.startContainer;
    console.log('selection', {
      data: rangeZero,
      endContainer,
      startContainer,
      commonContainer,
    });
    range.start = rangeZero.startOffset;
    range.end = rangeZero.endOffset;
    range.parentNode = rangeZero.commonAncestorContainer.parentNode;
  }
  return range;
};
export const insertIntoText = (
  targetText: string,
  startPosition: number,
  endPosition: number,
  toInsertAtStart: string,
  toInsertAtEnd: string
) => {
  const newText =
    targetText?.slice(0, startPosition) +
    toInsertAtStart +
    targetText?.slice(startPosition, endPosition) +
    toInsertAtEnd +
    targetText?.slice(endPosition);

  return newText;
};
