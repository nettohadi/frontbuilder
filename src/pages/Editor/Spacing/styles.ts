import styled from 'styled-components';
import { convertToNumber } from '@src/utils/helperFunctions';

const paddingPattern = () => `
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(45deg, #444cf7 0, 
    #444cf7 0.5px, 
    #e5e5f7 0, 
    #e5e5f7 50%);
`;

const marginPattern = () => `
  background-color: #e5e5f7;
  opacity: 0.8;
  background-size: 5px 5px;
  background-image: repeating-linear-gradient(45deg, #e58911 0,
    #e58911 1px,
    #e5e5f7 0,
    #e5e5f7 50%);
`;

export const TopPadding = styled.div<{
  height: string;
}>`
  position: absolute;
  top: 0px;
  left: 0;
  ${paddingPattern()}
  height: ${({ height }) =>
    `calc(${height} + ${convertToNumber(height) ? '2' : '0'}px)`};
  width: 100%;
`;

export const BottomPadding = styled.div<{
  height: string;
}>`
  position: absolute;
  bottom: 0px;
  left: 0;
  ${paddingPattern()}
  height: ${({ height }) =>
    `calc(${height} + ${convertToNumber(height) ? '1' : '0'}px)`};
  width: 100%;
`;

export const LeftPadding = styled.div<{
  width: number;
}>`
  position: absolute;
  top: -1px;
  left: 0px;
  ${paddingPattern()}
  height:100%;
  width: ${({ width }) =>
    `calc(${width} + ${convertToNumber(width) ? '2' : '0'}px)`};
`;

export const RightPadding = styled.div<{
  width: number;
}>`
  position: absolute;
  top: 0px;
  right: 0px;
  ${paddingPattern()}
  height: 100%;
  width: ${({ width }) =>
    `calc(${width} + ${convertToNumber(width) ? '2' : '0'}px)`};
`;

export const TopMargin = styled.div<{
  height: string;
  left: string;
  right: string;
}>`
  position: absolute;
  top: ${({ height }) => `calc((${height} + 2px) * -1)`};
  left: ${({ left }) => `calc((${left} + 3px) * -1)`};
  right: ${({ right }) => `calc((${right} + 3px) * -1)`};
  background-color: #e5e5f7;
  opacity: 0.8;
  ${marginPattern()}
  height: ${({ height }) => height};
`;

export const BottomMargin = styled.div<{
  height: string;
  left: string;
  right: string;
}>`
  position: absolute;
  bottom: ${({ height }) => `calc((${height} + 3px) * -1)`};
  left: ${({ left }) => `calc((${left} + 3px) * -1)`};
  right: ${({ right }) => `calc((${right} + 3px) * -1)`};
  background-color: #e5e5f7;
  opacity: 0.8;
  ${marginPattern()}
  height: ${({ height }) =>
    `calc(${height} + ${convertToNumber(height) > 0 ? 1 : 0}px)`};
`;

export const LeftMargin = styled.div<{
  width: string;
}>`
  position: absolute;
  top: -2px;
  left: ${({ width }) => `calc((${width} + 3px) * -1)`};
  background-color: #e5e5f7;
  opacity: 0.8;
  ${marginPattern()}
  height: calc(100% + 4px);
  width: ${({ width }) =>
    `calc(${width} + ${convertToNumber(width) > 0 ? 1 : 0}px)`};
`;

export const RightMargin = styled.div<{
  width: string;
}>`
  position: absolute;
  top: -2px;
  right: ${({ width }) => `calc((${width} + 3px) * -1)`};
  background-color: #e5e5f7;
  opacity: 0.8;
  ${marginPattern()}
  height: calc(100% + 4px);
  width: ${({ width }) =>
    `calc(${width} + ${convertToNumber(width) > 0 ? 1 : 0}px)`};
`;
