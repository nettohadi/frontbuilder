import styled from 'styled-components';

export const LoadingContainer = styled.div<{
  color: string;
  size: number;
  width: string;
  height: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: ${({ color }) => color};
  font-size: ${({ size }) => size}px;
  text-align: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  //.text {
  //  padding-bottom: 4px;
  //}
`;

export const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: spin 0.8s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform-origin: 50% 50%;
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }
    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }
`;
