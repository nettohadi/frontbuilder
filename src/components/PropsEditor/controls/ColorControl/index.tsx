import React from 'react';
import debounce from 'lodash.debounce';
import { ChromePicker } from 'react-color';

const ColorControl = ({ setStyle, name, value, label }: any) => {
  const [showColor, setShowColor] = React.useState(false);
  const [color, setColor] = React.useState(value);
  const handleChange = (color: any) => {
    setStyle({ [name]: color.hex });
  };

  const debouncedHandleChange = debounce(handleChange, 500);
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
                onChangeComplete={debouncedHandleChange}
                onChange={(color) => {
                  setColor(color.hex);
                }}
              />
            </div>
          )}
        </div>
        <input
          type="text"
          value={color}
          onChange={(e: any) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ColorControl;
