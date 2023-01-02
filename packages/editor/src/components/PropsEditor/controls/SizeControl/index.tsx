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
  }, [value, setProp]);

  const handleSelect = (e: any) => {
    setUnit(e.target.value);
    setProp({ [name]: size > 0 ? size + e.target.value : 'auto' });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter') {
      setProp({
        [name]: Number(target.value) > 0 ? target.value + unit : 'auto',
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setProp({
      [name]: Number(target.value) > 0 ? target.value + unit : 'auto',
    });
  };

  const getOnlyNumber = (value: string) => {
    return Math.round(convertToNumber(value));
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
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
            onChange={(e: any) => {
              setSize(e.target.value);
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
