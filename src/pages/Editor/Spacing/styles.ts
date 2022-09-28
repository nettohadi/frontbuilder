import styled from 'styled-components';
import { convertToNumber } from '@src/utils/helperFunctions';

export const TopPadding = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    45deg,
    #444cf7 0,
    #444cf7 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

export const BottomPadding = styled.div<{
  bottom: number;
  left: number;
  width: number;
  height: number;
}>`
  position: fixed;
  top: ${({ bottom, height }) =>
    bottom - Number(String(height).replace('px', ''))}px;
  left: ${({ left }) => left}px;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    45deg,
    #444cf7 0,
    #444cf7 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

export const LeftPadding = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    45deg,
    #444cf7 0,
    #444cf7 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

export const RightPadding = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    45deg,
    #444cf7 0,
    #444cf7 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

export const TopMargin = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: fixed;
  top: ${({ top, height }) => top - convertToNumber(height)}px;
  left: ${({ left }) => left}px;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    45deg,
    #e58911 0,
    #e58911 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
  height: ${({ height }) => height};
  width: ${({ width }) => width}px;
`;

export const BottomMargin = styled.div<{
  bottom: number;
  left: number;
  width: number;
  height: number;
}>`
  position: fixed;
  top: ${({ bottom }) => bottom}px;
  left: ${({ left }) => left}px;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    45deg,
    #e58911 0,
    #e58911 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
  height: ${({ height }) => height};
  width: ${({ width }) => width}px;
`;

export const LeftMargin = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${({ left, width }) => left - convertToNumber(width)}px;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    45deg,
    #e58911 0,
    #e58911 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
  height: ${({ height }) => height}px;
  width: ${({ width }) => width};
`;

export const RightMargin = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${({ left, width }) => left + convertToNumber(width)}px;
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(
    45deg,
    #e58911 0,
    #e58911 1px,
    #e5e5f7 0,
    #e5e5f7 50%
  );
  height: ${({ height }) => height}px;
  width: ${({ width }) => width};
`;
