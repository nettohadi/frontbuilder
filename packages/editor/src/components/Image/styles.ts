import styled from 'styled-components';

export const BackgroundImage = styled.div<{ width?: string; height?: string }>`
  background-image: linear-gradient(
      45deg,
      rgb(244, 245, 250) 25%,
      transparent 25%
    ),
    linear-gradient(-45deg, rgb(244, 245, 250) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgb(244, 245, 250) 75%),
    linear-gradient(-45deg, transparent 75%, rgb(244, 245, 250) 75%);
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  background-color: #d7d6d6;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Img = styled.img<{ src: string }>`
  max-width: 100%;
  max-height: 100%;
  position: relative;
`;
