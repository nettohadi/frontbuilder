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

  .text {
    padding-bottom: 4px;
  }
`;

export const Spinner = styled.div`
  -webkit-animation: spin 0.4s linear infinite;
  animation: spin 0.4s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform-origin: 50% 40%;
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform-origin: 50% 40%;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 40%;
    }
    100% {
      transform: rotate(360deg);
      transform-origin: 50% 40%;
    }
  }
`;
