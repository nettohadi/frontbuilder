import React from 'react';
import { ChromePicker } from 'react-color';
import { ControlComponentType } from '@src/types';
import * as S from '../shared';
import styled from 'styled-components';

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
    <S.Container>
      <label>{label}</label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'start',
        }}
      >
        <div
          onClick={(e) => {
            setShowColor(!showColor);
          }}
          style={{
            position: 'relative',
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
          onChange={(e: any) => {
            setColor(e.target.value);
            setStyle({ [name]: e.target.value });
          }}
        />
      </div>
    </S.Container>
  );
};

export default ColorControl;
