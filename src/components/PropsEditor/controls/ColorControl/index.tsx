import React from 'react';
import { ChromePicker, ColorResult, RGBColor, SketchPicker } from 'react-color';
import { ControlComponentType } from '@src/types';
import * as G from '../shared';
import * as S from './styles';
import FloatingMenu from '@components/FloatingMenu';

const ColorControl: ControlComponentType = ({
  setProp,
  name,
  value,
  label,
}) => {
  const [showColor, setShowColor] = React.useState(false);
  const [color, setColor] = React.useState<string>();

  React.useEffect(() => {
    setColor(value);
  }, [value]);

  const handleChange = (color: any) => {
    setProp({ [name]: RGBToString(color.rgb) });
  };

  const toggleColorPicker = () => setShowColor(!showColor);

  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <G.InputCol>
        <S.ColorInputWrapper>
          <FloatingMenu
            theme="light-border"
            content={
              <SketchPicker
                color={stringToRGB(color)}
                onChangeComplete={handleChange}
                onChange={(selectedColor) => {
                  setColor(RGBToString(selectedColor?.rgb));
                }}
              />
            }
            visible={showColor}
            onClickOutside={() => setShowColor(false)}
          >
            <S.ButtonColor onClick={toggleColorPicker} color={color} />
          </FloatingMenu>

          <G.Input
            width="100%"
            type="text"
            value={color}
            onChange={(e: any) => {
              setColor(e.target.value);
              setProp({ [name]: e.target.value });
            }}
          />
        </S.ColorInputWrapper>
      </G.InputCol>
    </G.Container>
  );
};

export default ColorControl;

const RGBToString = (rgbObject: RGBColor) => {
  return `rgb(${rgbObject.r} ${rgbObject.g} ${rgbObject.b} / ${rgbObject.a})`;
};

const stringToRGB = (stringColor: string = '') => {
  if (stringColor.includes('rgb')) {
    return rgbStringToRgb(stringColor);
  }

  if (stringColor.includes('#')) {
    return hexStringToRgb(stringColor);
  }

  return stringColor;
};

const rgbStringToRgb = (stringColor: string = '') => {
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

const hexStringToRgb = (stringColor: string = '') => {
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
