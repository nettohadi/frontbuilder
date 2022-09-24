import React from 'react';
import { ControlComponentType } from '@src/types';
import * as S from '../shared';

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
      <S.Input
        autoComplete={false}
        type="number"
        value={Math.round(Number(String(size).replace('px', '')))}
        onChange={(e: any) => {
          setSize(e.target.value);
          setStyle({ [name]: e.target.value + 'px' });
        }}
      />
      <span>PX / %</span>
    </div>
  );
};

export default SizeControl;
