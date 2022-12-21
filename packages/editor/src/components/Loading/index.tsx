import * as S from './styles';
import { CgSpinnerTwo } from 'react-icons/cg';
import React from 'react';

const Loading = ({
  color = 'inherit',
  size = 16,
  text = 'Loading...',
  width = '100%',
  height = '100%',
}: {
  color?: string;
  size?: number;
  text?: string;
  width?: string;
  height?: string;
}) => {
  return (
    <S.LoadingContainer color={color} size={size} width={width} height={height}>
      <S.Spinner>
        <CgSpinnerTwo size={size} />
      </S.Spinner>
      <div className="text">{text}</div>
    </S.LoadingContainer>
  );
};

export default Loading;
