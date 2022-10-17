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
    <SketchPicker
      color={stringToRgb(color)}
      onChangeComplete={onChangeComplete}
      onChange={onChange}
    />
  );
};

export default ColorPicker;
