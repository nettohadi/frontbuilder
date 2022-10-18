import React from 'react';

import { SketchPicker } from 'react-color';
import { stringToRgb } from '@src/utils/helperFunctions';

const ColorPicker = ({
  color,
  onChangeComplete,
  onChange,
}: {
  color: string | undefined;
  onChangeComplete?: (color: any) => void;
  onChange?: (selectedColor: any) => void;
}) => {
  return (
    <div data-testid="color-picker">
      <SketchPicker
        color={stringToRgb(color)}
        onChangeComplete={onChangeComplete}
        onChange={onChange}
      />
    </div>
  );
};

export default ColorPicker;
