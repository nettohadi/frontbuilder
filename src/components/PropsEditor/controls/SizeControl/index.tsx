import React from 'react';
import styled from 'styled-components';
import { ControlComponentType } from '@src/types';
import * as G from '../shared';
import { getColor } from '@src/theme';
import { convertToNumber } from '@src/utils/helperFunctions';

const SizeControl: ControlComponentType = ({ setProp, name, value, label }) => {
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
    setProp({ [name]: size + e.target.value });
  };

  const getOnlyNumber = (value: string) => {
    return Math.round(Number(value.replace('px', '').replace('%', '')));
  };

  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <G.InputCol>
        <G.SizeInputContainer>
          <G.SizeInput
            data-testid={`${name}-size-input`}
            autoComplete="false"
            width="40px"
            type="number"
            value={getOnlyNumber(String(size)) || 0}
            onChange={(e: any) => {
              setSize(e.target.value);
              setProp({ [name]: e.target.value + unit });
            }}
          />
          <span>
            <Select
              data-testid={`${name}-unit-select`}
              onChange={handleSelect}
              value={unit}
            >
              <option value="px">px</option>
              <option value="%">%</option>
            </Select>
          </span>
        </G.SizeInputContainer>
      </G.InputCol>
    </G.Container>
  );
};

export default SizeControl;

const Select = styled.select`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: none;
`;
