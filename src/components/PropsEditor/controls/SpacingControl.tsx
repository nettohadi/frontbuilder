import React, { useEffect, useRef } from 'react';

import { ControlProps } from '@src/types';
import * as S from '@components/PropsEditor/controls/shared';
import styled from 'styled-components';
import { getColor } from '@src/theme';
import { current } from '@src/common/current';
import { convertToNumber } from '@src/utils/helperFunctions';

const SpacingControl = ({ setStyle, name, value, label }: ControlProps) => {
  const onFocus = useRef(false);
  const [size, setSize] = React.useState<number>(value);
  const [unit, setUnit] = React.useState<string>(
    String(value).includes('%') ? '%' : 'px'
  );
  const handleSelect = (e: any) => {
    setUnit(e.target.value);
    setStyle({ [name]: size + e.target.value });
  };

  const getOnlyNumber = (value: string) => {
    return Math.round(Number(value.replace('px', '').replace('%', '')));
  };

  const handleMouseenter = () => {
    const spacingName = name.toLowerCase();
    if (spacingName !== 'margin' && spacingName !== 'padding') return;

    if (spacingName === 'padding') {
      current.setHighlightPadding(true);
      setStyle({});
    } else {
      current.setHighlightMargin(true);
      setStyle({});
    }
  };

  useEffect(() => {
    setSize(convertToNumber(value));
  }, [value]);

  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
    setStyle({ [name]: `${e.target.value}${unit}` });
  };

  const handleMouseleave = () => {
    const spacingName = name.toLowerCase();
    if (
      (spacingName !== 'margin' && spacingName !== 'padding') ||
      onFocus.current
    )
      return;
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
          value={convertToNumber(size) || 0}
          onChange={handleSizeChange}
        />
        <S.SpacingInput
          borderPosition="top"
          width="30px"
          autoComplete="false"
          type="number"
          value={getOnlyNumber(String(size)) || 0}
          onChange={handleSizeChange}
        />
        <S.SpacingInput
          borderPosition="right"
          width="30px"
          autoComplete="false"
          type="number"
          value={getOnlyNumber(String(size)) || 0}
          onChange={handleSizeChange}
        />
        <S.SpacingInput
          borderPosition="bottom"
          width="30px"
          autoComplete="false"
          type="number"
          value={getOnlyNumber(String(size)) || 0}
          onChange={handleSizeChange}
        />
        <span>
          <Select onChange={handleSelect} value={unit}>
            <option value="px">px</option>
            <option value="%">%</option>
          </Select>
        </span>
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
