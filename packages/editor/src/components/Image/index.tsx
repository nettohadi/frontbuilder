import * as S from './styles';
import React from 'react';

const Image = ({
  src,
  name,
  children,
  alt,
  onClick,
  width,
  height,
}: {
  src: string;
  name?: string;
  children?: any;
  alt?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
}) => {
  return (
    <S.BackgroundImage
      className="background-image"
      onClick={onClick}
      width={width}
      height={height}
    >
      {children}
      <S.Img src={src} alt={alt} />
      {name && <label>{name}</label>}
    </S.BackgroundImage>
  );
};

export default Image;
