import React, { useState } from 'react';
import styled from 'styled-components';
import { ControlComponentType } from '@src/types';
import * as G from '../shared';
import { getColor } from '@src/theme';
import { convertToNumber } from '@src/utils/helperFunctions';
import FloatingMenu from '@components/FloatingMenu';

const SizeControlFactory = (shouldShowPreset: boolean = true) => {
  const SizeControl: ControlComponentType = ({
    setProp,
    name,
    value,
    label,
  }) => {
    const normalizeSize = (size: any) =>
      size === 'auto' || String(size) === 'NaN'
        ? 'auto'
        : Math.round(convertToNumber(size));

    const [size, setSize] = React.useState<number | 'auto'>(
      normalizeSize(value)
    );
    const [unit, setUnit] = React.useState(
      String(value).includes('%') ? '%' : 'px'
    );

    React.useEffect(() => {
      setSize(normalizeSize(value));
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

    const [presetIsVisible, showPreset] = useState(false);

    const Presets = () => {
      const setValue = (value: string) => {
        const newSize = normalizeSize(value);
        const newUnit = value.replace(String(newSize), '');
        const newProp =
          value.toLowerCase() !== 'auto' ? newSize + newUnit : 'auto';
        setProp({
          [name]: newProp,
        });
        setSize(newSize);
        setUnit(newUnit);
      };

      return (
        <PresetsContainer>
          <G.OptionsContainer>
            <G.Option
              data-testid={''}
              selected={false}
              onClick={() => setValue('100%')}
            >
              100%
            </G.Option>
            <G.Option
              data-testid={''}
              selected={false}
              onClick={() => setValue('50%')}
            >
              50%
            </G.Option>
            <G.Option
              data-testid={''}
              selected={false}
              onClick={() => setValue('33%')}
            >
              33%
            </G.Option>
            <G.Option
              data-testid={''}
              selected={false}
              onClick={() => setValue('25%')}
            >
              25%
            </G.Option>
            <G.Option
              data-testid={''}
              selected={false}
              onClick={() => setValue('auto')}
            >
              Auto
            </G.Option>
          </G.OptionsContainer>
        </PresetsContainer>
      );
    };

    return (
      <G.Container>
        <G.LabelCol>
          <label>{label}</label>
        </G.LabelCol>
        <G.InputCol>
          <G.SizeInputContainer>
            <FloatingMenu
              content={<Presets />}
              visible={presetIsVisible}
              theme={'dark'}
              onClickOutside={() => showPreset(false)}
              showArrow
            >
              <G.SizeInput
                data-testid={`${name}-size-input`}
                autoComplete="false"
                width="40px"
                type="text"
                value={normalizeSize(size)}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
                onChange={(e: any) => {
                  const newSize = normalizeSize(e.target.value);
                  setSize(newSize);
                }}
                onFocus={() => {
                  if (shouldShowPreset) showPreset(true);
                }}
              />
            </FloatingMenu>

            <span>
              <Select
                data-testid={`${name}-unit-select`}
                onChange={handleSelect}
                value={unit}
              >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
              </Select>
            </span>
          </G.SizeInputContainer>
        </G.InputCol>
      </G.Container>
    );
  };

  return SizeControl;
};

export default SizeControlFactory;

const Select = styled.select`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: none;

  &:focus {
    outline: none;
  }
`;

const PresetsContainer = styled.div`
  width: auto;
  height: 30px;
  display: flex;
  padding: 0 2px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
`;
