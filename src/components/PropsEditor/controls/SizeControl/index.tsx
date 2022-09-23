import React from 'react';
import debounce from 'lodash.debounce';
import { ControlComponentType } from '@src/types';

const SizeControl: ControlComponentType = ({
  setStyle,
  name,
  value,
  label,
}) => {
  const handleChange = (e: any) => {
    setStyle({ [name]: e.target.value + 'px' });
  };

  const [size, setSize] = React.useState(value);

  React.useEffect(() => {
    setSize(value);
  }, [value]);

  const debouncedHandleChange = debounce(handleChange, 500);
  return (
    <div>
      <div>{label}</div>
      <input
        type="number"
        value={String(size).replace('px', '')}
        onChange={(e) => {
          setSize(e.target.value);
          debouncedHandleChange(e);
        }}
      />
      <span>px</span>
    </div>
  );
};

export default SizeControl;
