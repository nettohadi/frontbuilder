import React, { useEffect, useRef } from 'react';

import { ControlProps, SpacingType } from '@src/types';
import * as S from '@components/PropsEditor/controls/shared';
import { current } from '@src/common/current';
import {
  convertToNumber,
  extractSpacing,
  assembleSpacing,
  debounce,
} from '@src/utils/helperFunctions';

const SpacingControl = ({ setStyle, name, value, label }: ControlProps) => {
  const onFocus = useRef(false);
  const [size, setSize] = React.useState<SpacingType>(extractSpacing(value));
  const [isEqual, setIsEqual] = React.useState<boolean>(false);

  useEffect(() => {
    setSize(extractSpacing(value));
  }, [value, name]);

  useEffect(() => {
    const { top, right, bottom, left } = size;
    const isTheSame = top === right && right === bottom && bottom === left;
    setIsEqual(isTheSame);
  }, [size]);

  const handleSizeChange = (e: any, propName: string) => {
    const newSize: SpacingType = isEqual
      ? {
          top: e.target.value,
          right: e.target.value,
          bottom: e.target.value,
          left: e.target.value,
          unit: size.unit,
        }
      : {
          ...size,
          [propName]: convertToNumber(e.target.value),
        };
    setSize(newSize);
    setStyle({ [name]: `${assembleSpacing(newSize)}` });
  };

  const showSpacing = () => {
    const spacingName = name.toLowerCase();
    if (spacingName !== 'margin' && spacingName !== 'padding') return;

    if (spacingName === 'padding') {
      current.setHighlightPadding(true);
    } else {
      current.setHighlightMargin(true);
    }
    setStyle();
  };

  const hideSpacing = () => {
    const spacingName = name.toLowerCase();
    if (
      (spacingName !== 'margin' && spacingName !== 'padding') ||
      onFocus.current
    ) {
      return;
    }

    if (spacingName === 'padding') {
      current.setHighlightPadding(false);
    } else {
      current.setHighlightMargin(false);
    }

    setStyle();
  };

  const handleFocus = () => {
    onFocus.current = true;
    showSpacing();
  };

  const handleBlur = () => {
    onFocus.current = false;
    hideSpacing();
  };

  return (
    <S.Container
      onMouseEnter={showSpacing}
      onMouseLeave={hideSpacing}
      onClick={showSpacing}
    >
      <label>{label}</label>
      <S.SpacingContainer>
        <S.SpacingInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.left)}
          onChange={(e: any) => handleSizeChange(e, 'left')}
        />
        <S.SpacingInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderPosition="top"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.top)}
          onChange={(e: any) => handleSizeChange(e, 'top')}
        />
        <S.SpacingInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderPosition="right"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.right)}
          onChange={(e: any) => handleSizeChange(e, 'right')}
        />
        <S.SpacingInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderPosition="bottom"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.bottom)}
          onChange={(e: any) => handleSizeChange(e, 'bottom')}
        />
        <span>PX</span>
        <input
          id={`${name}-equal`}
          type="checkbox"
          checked={isEqual}
          onChange={(e: any) => setIsEqual(e.target.checked)}
        />
        <label style={{ fontSize: 12 }} htmlFor={`${name}-equal`}>
          Equal
        </label>
      </S.SpacingContainer>
    </S.Container>
  );
};

export default SpacingControl;
