import styled, { css } from 'styled-components';
import { COLORS } from '@src/global/variables';

export const Button = styled.button<{
  variant: 'primary' | 'secondary';
  disabled: boolean;
}>`
  border: 1px solid black;
  background-color: ${({ variant }) =>
    variant === 'primary' ? COLORS.PRIMARY : 'rgb(65, 63, 63)'};
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  color: ${({ variant }) => (variant === 'primary' ? 'black' : 'white')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 35px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${({ variant, disabled }) => (!disabled ? hoverEffect(variant) : '')}
`;

const hoverEffect = (variant: string) => css`
  &:hover {
    background-color: ${variant === 'primary'
      ? COLORS.PRIMARY_HOVER
      : 'rgb(73,72,72)'};
  }
`;

export const Spinner = styled.div`
  -webkit-animation: spin 2s linear infinite;
  animation: spin 0.7s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform-origin: 50% 45%;
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform-origin: 50% 45%;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 45%;
    }
    100% {
      transform: rotate(360deg);
      transform-origin: 50% 45%;
    }
  }
`;
