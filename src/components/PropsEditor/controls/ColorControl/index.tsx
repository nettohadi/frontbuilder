import React from 'react';
import { ChromePicker } from 'react-color';
import { ControlComponentType } from '@src/types';
import * as S from '../shared';

const ColorControl: ControlComponentType = ({
  setStyle,
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
    setStyle({ [name]: color.hex });
  };

  return (
    <div>
      <div>{label}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <div
          onClick={(e) => {
            setShowColor(!showColor);
          }}
          style={{
            position: 'relative',
            height: 20,
            width: 20,
            backgroundColor: color,
            cursor: 'pointer',
          }}
        >
          {showColor && (
            <div
              style={{
                position: 'absolute',
                top: 20,
                zIndex: 5,
                height: '100vh',
              }}
              id={'color-picker-wrapper'}
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.target.id === 'color-picker-wrapper') {
                  setShowColor(false);
                }
              }}
            >
              <ChromePicker
                color={color}
                onChangeComplete={handleChange}
                onChange={(color) => {
                  setColor(color.hex);
                }}
              />
            </div>
          )}
        </div>
        <S.Input
          type="text"
          value={color}
          onChange={(e: any) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ColorControl;
