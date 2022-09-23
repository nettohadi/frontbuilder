import React from 'react';
import { ControlComponentType } from '@src/types';

const SizeControl: ControlComponentType = ({
  setStyle,
  name,
  value,
  label,
}) => {
  const [size, setSize] = React.useState(value);

  React.useEffect(() => {
    setSize(value);
  }, [value]);

  return (
    <div>
      <div>{label}</div>
      <input
        type="number"
        value={String(size).replace('px', '')}
        onChange={(e) => {
          setSize(e.target.value);
          setStyle({ [name]: e.target.value + 'px' });
        }}
      />
      <span>px</span>
    </div>
  );
};

export default SizeControl;
