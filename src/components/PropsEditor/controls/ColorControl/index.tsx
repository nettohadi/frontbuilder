import React from 'react';
import { ChromePicker } from 'react-color';
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
  const [color, setColor] = React.useState(value);

  React.useEffect(() => {
    setColor(value);
  }, [value]);

  const handleChange = (color: any) => {
    setProp({ [name]: color.hex });
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
              <ChromePicker
                color={color}
                onChangeComplete={handleChange}
                onChange={(color) => {
                  setColor(color.hex);
                }}
              />
            }
            visible={showColor}
            onClickOutside={() => setShowColor(false)}
          >
            <S.ButtonColor onClick={toggleColorPicker} color={color} />
          </FloatingMenu>

          <G.Input
            width="70px"
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
