import styled from 'styled-components';

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
  top: -1px;
  left: 0;
  ${paddingPattern()}
  height: ${({ height }) => height};
  width: 100%;
`;

export const BottomPadding = styled.div<{
  height: string;
}>`
  position: absolute;
  bottom: -1px;
  left: 0;
  ${paddingPattern()}
  height: ${({ height }) => height};
  width: 100%;
`;

export const LeftPadding = styled.div<{
  width: number;
}>`
  position: absolute;
  top: -1px;
  left: -2px;
  ${paddingPattern()}
  height:100%;
  width: ${({ width }) => width};
`;

export const RightPadding = styled.div<{
  width: number;
}>`
  position: absolute;
  top: -1px;
  right: -2px;
  ${paddingPattern()}
  height: 100%;
  width: ${({ width }) => width};
`;

export const TopMargin = styled.div<{
  height: string;
  left: string;
  right: string;
}>`
  position: absolute;
  top: ${({ height }) => `calc((${height} + 2px) * -1)`};
  left: ${({ left }) => `calc((${left} + 2px) * -1)`};
  right: ${({ right }) => `calc((${right} + 2px) * -1)`};
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
  bottom: ${({ height }) => `calc((${height} + 2px) * -1)`};
  left: ${({ left }) => `calc((${left} + 2px) * -1)`};
  right: ${({ right }) => `calc((${right} + 2px) * -1)`};
  background-color: #e5e5f7;
  opacity: 0.8;
  ${marginPattern()}
  height: ${({ height }) => height};
`;

export const LeftMargin = styled.div<{
  width: string;
}>`
  position: absolute;
  top: -2px;
  left: ${({ width }) => `calc((${width} + 2px) * -1)`};
  background-color: #e5e5f7;
  opacity: 0.8;
  ${marginPattern()}
  height: 102%;
  width: ${({ width }) => width};
`;

export const RightMargin = styled.div<{
  width: string;
}>`
  position: absolute;
  top: -2px;
  right: ${({ width }) => `calc((${width} + 2px) * -1)`};
  background-color: #e5e5f7;
  opacity: 0.8;
  ${marginPattern()}
  height: 102%;
  width: ${({ width }) => width};
`;
