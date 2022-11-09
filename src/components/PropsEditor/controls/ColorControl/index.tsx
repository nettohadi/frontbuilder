import React from 'react';
import { ControlComponentType } from '@src/types';
import * as G from '../shared';
import * as S from './styles';
import FloatingMenu from '@components/FloatingMenu';
import ColorPicker from '@components/ColorPicker';
import { rgbToRgbString, validateColor } from '@src/utils/helperFunctions';

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
  }, [value, setProp]);

  const handleChange = (color: any) => {
    setProp({ [name]: rgbToRgbString(color.rgb) });
  };

  const handleChangeInput = (e: any) => {
    setColor(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter') {
      setProp({ [name]: validateColor(target.value) });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setProp({ [name]: validateColor(target.value) });
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
              <ColorPicker
                color={color}
                onChangeComplete={handleChange}
                onChange={(selectedColor) => {
                  setColor(rgbToRgbString(selectedColor?.rgb));
                }}
              />
            }
            visible={showColor}
            onClickOutside={() => setShowColor(false)}
          >
            <S.ButtonColor
              style={{ backgroundColor: color }}
              data-testid={`${name}-color-button`}
              onClick={toggleColorPicker}
              color={color}
            />
          </FloatingMenu>

          <G.Input
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
            data-testid={`${name}-color-input`}
            width="100%"
            type="text"
            value={color}
            onChange={handleChangeInput}
          />
        </S.ColorInputWrapper>
      </G.InputCol>
    </G.Container>
  );
};

export default ColorControl;
