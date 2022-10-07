// @ts-ignore
import * as lodashDebounce from 'lodash.debounce';
import { SpacingType } from '@src/types';

export const convertToNumber = (strValue: string | number) => {
  return Number(String(strValue).replace('px', '').replace('%', ''));
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

export const debounce = (func: any) => {
  return lodashDebounce(func, 500);
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
