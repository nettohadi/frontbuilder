import * as S from '@components/PropsEditor/controls/shared';
import { BsAlignCenter, BsAlignStart, BsAlignEnd } from 'react-icons/bs';
import styled from 'styled-components';
import { getColor } from '@src/theme';
import React from 'react';

const HorizontalAlignmentControl = ({ setStyle, name, value, label }: any) => {
  const [align, setAlign] = React.useState(value);
  const handleClick = (_value: any) => {
    setStyle({ [name]: _value });
    setAlign(_value);
  };
  return (
    <S.Container>
      <label>{label}</label>
      <AlignWrapper>
        <AlignContainer
          selected={align === 'start'}
          onClick={() => handleClick('start')}
        >
          <BsAlignStart />
        </AlignContainer>
        <AlignContainer
          selected={align === 'center'}
          onClick={() => handleClick('center')}
        >
          <BsAlignCenter />
        </AlignContainer>
        <AlignContainer
          selected={align === 'end'}
          onClick={() => handleClick('end')}
        >
          <BsAlignEnd />
        </AlignContainer>
      </AlignWrapper>
    </S.Container>
  );
};

export default HorizontalAlignmentControl;

const AlignWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const AlignContainer = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? getColor('inputBackground') : 'rgb(94 94 94)'};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 1px solid transparent;
  padding: 5px;
`;
