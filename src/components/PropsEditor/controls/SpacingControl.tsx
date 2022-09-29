import React, { useEffect, useRef } from 'react';

import { ControlProps, SpacingType } from '@src/types';
import * as S from '@components/PropsEditor/controls/shared';
import styled from 'styled-components';
import { getColor } from '@src/theme';
import { current } from '@src/common/current';
import {
  convertToNumber,
  extractSpacing,
  assembleSpacing,
} from '@src/utils/helperFunctions';

const SpacingControl = ({ setStyle, name, value, label }: ControlProps) => {
  const onFocus = useRef(false);
  const [size, setSize] = React.useState<SpacingType>(extractSpacing(value));

  const handleMouseenter = () => {
    const spacingName = name.toLowerCase();
    if (spacingName !== 'margin' && spacingName !== 'padding') return;

    if (spacingName === 'padding') {
      current.setHighlightPadding(true);
    } else {
      current.setHighlightMargin(true);
    }
    setStyle({});
  };

  useEffect(() => {
    setSize(extractSpacing(value));
  }, [value]);

  const handleSizeChange = (e: any, propName: string) => {
    const newSize: SpacingType = {
      ...size,
      [propName]: convertToNumber(e.target.value),
    };
    setSize(newSize);
    setStyle({ [name]: `${assembleSpacing(newSize)}` });
  };

  const handleMouseleave = () => {
    const spacingName = name.toLowerCase();
    if (
      (spacingName !== 'margin' && spacingName !== 'padding') ||
      onFocus.current
    ) {
      return;
    }

    current.setHighlightMargin(false);
    current.setHighlightPadding(false);
    setStyle({});
  };

  return (
    <S.Container
      onMouseEnter={handleMouseenter}
      onMouseLeave={handleMouseleave}
    >
      <label>{label}</label>
      <S.SpacingContainer>
        <S.SpacingInput
          onFocus={() => (onFocus.current = true)}
          onBlur={() => {
            onFocus.current = false;
            handleMouseleave();
          }}
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.left)}
          onChange={(e: any) => handleSizeChange(e, 'left')}
        />
        <S.SpacingInput
          borderPosition="top"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.top)}
          onChange={(e: any) => handleSizeChange(e, 'top')}
        />
        <S.SpacingInput
          borderPosition="right"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.right)}
          onChange={(e: any) => handleSizeChange(e, 'right')}
        />
        <S.SpacingInput
          borderPosition="bottom"
          width="30px"
          autoComplete="false"
          type="number"
          value={Math.round(size.bottom)}
          onChange={(e: any) => handleSizeChange(e, 'bottom')}
        />
        <span>PX</span>
      </S.SpacingContainer>
    </S.Container>
  );
};

export default SpacingControl;

const Select = styled.select`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: none;
  height: 20px;
`;
