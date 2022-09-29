import React from 'react';
import styled from 'styled-components';
import { ControlComponentType } from '@src/types';
import * as S from '../shared';
import { getColor } from '@src/theme';
import { convertToNumber } from '@src/utils/helperFunctions';

const SizeControl: ControlComponentType = ({
  setStyle,
  name,
  value,
  label,
}) => {
  const [size, setSize] = React.useState<number>(convertToNumber(value));
  const [unit, setUnit] = React.useState(
    String(value).includes('%') ? '%' : 'px'
  );

  React.useEffect(() => {
    setSize(convertToNumber(value));
    setUnit(String(value).includes('%') ? '%' : 'px');
  }, [value]);

  const handleSelect = (e: any) => {
    setUnit(e.target.value);
    setStyle({ [name]: size + e.target.value });
  };

  const getOnlyNumber = (value: string) => {
    return Math.round(Number(value.replace('px', '').replace('%', '')));
  };

  return (
    <S.Container>
      <label>{label}</label>
      <S.SizeInputContainer>
        <S.SizeInput
          autoComplete="false"
          width="30px"
          type="number"
          value={getOnlyNumber(String(size)) || 0}
          onChange={(e: any) => {
            setSize(e.target.value);
            setStyle({ [name]: e.target.value + unit });
          }}
        />
        <span>
          <Select onChange={handleSelect} value={unit}>
            <option value="px">px</option>
            <option value="%">%</option>
          </Select>
        </span>
      </S.SizeInputContainer>
    </S.Container>
  );
};

export default SizeControl;

const Select = styled.select`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: none;
`;
