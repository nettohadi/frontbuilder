// @ts-ignore
import * as lodashDebounce from 'lodash.debounce';
import { SpacingType } from '@src/types';

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

  const backgroundProps = ['backgroundColor', 'backgroundImage', 'backgroundSize'];

  const displayProps = ['flexDirection', 'display', 'alignItems', 'justifyContent'];

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

  const sizeProps = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight'];

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
