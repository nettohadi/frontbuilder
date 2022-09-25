import * as S from '@components/PropsEditor/controls/shared';
import * as Md from 'react-icons/md';
import styled from 'styled-components';
import { getColor } from '@src/theme';
import React from 'react';

const VerticalAlignmentControl = ({ setStyle, name, value, label }: any) => {
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
          <Md.MdAlignVerticalTop />
        </AlignContainer>
        <AlignContainer
          selected={align === 'center'}
          onClick={() => handleClick('center')}
        >
          <Md.MdAlignHorizontalCenter />
        </AlignContainer>
        <AlignContainer
          selected={align === 'end'}
          onClick={() => handleClick('end')}
        >
          <Md.MdAlignVerticalBottom />
        </AlignContainer>
      </AlignWrapper>
    </S.Container>
  );
};

export default VerticalAlignmentControl;

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
