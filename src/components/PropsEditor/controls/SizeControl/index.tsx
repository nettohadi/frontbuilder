import React from 'react';
import styled from 'styled-components';
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
    <S.Container>
      <label>{label}</label>
      <S.Input
        autoComplete="false"
        type="number"
        value={Math.round(Number(String(size).replace('px', ''))) || 0}
        onChange={(e: any) => {
          setSize(e.target.value);
          setStyle({ [name]: e.target.value + 'px' });
        }}
      />
      <span>PX / %</span>
    </S.Container>
  );
};

export default SizeControl;
