import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${COLORS.CONTROL_SECONDARY_BACKGROUND};
`;

export const LogoWrapper = styled.div`
  padding: 20px;
  color: ${COLORS.PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
  font-size: 25px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto;
  max-width: 600px;
  width: 95%;
  background-color: ${COLORS.CONTROL_BACKGROUND};
  border-radius: 5px;
  border: 1px solid black;
  gap: 15px;
  padding: 30px 35px;

  h2 {
    color: white;
    margin-bottom: 20px;
  }

  a {
    color: ${COLORS.PRIMARY};

    :hover {
      color: ${COLORS.PRIMARY_HOVER};
    }
  }
`;

export const GoogleButton = styled.button`
  border: 2px solid black;
  color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: center;
  height: 50px;
  width: 100%;
  background-color: #535050;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  line-height: 70px;

  :hover {
    background-color: #646161;
  }
`;

export const SignInButton = styled.button`
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  background-color: ${COLORS.PRIMARY};
  color: black;
  border-radius: 5px;
  font-size: 17px;
  cursor: pointer;
  font-weight: 600;
  gap: 10px;
  transition: all 0.2s ease-in-out;

  :hover {
    background-color: ${COLORS.PRIMARY_HOVER};
  }
`;

export const InputWrapper = styled.div`
  border: 1px solid ${COLORS.INPUT_BACKGROUND};
  border-radius: 5px;
  background-color: ${COLORS.INPUT_BACKGROUND};
  height: 40px;
  width: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;

  :focus-within {
    outline: none;
    border: 1px solid grey;
  }
`;

export const Input = styled.input`
  color: white;
  transition: all 0.2s ease-in-out;
  background-color: ${COLORS.INPUT_BACKGROUND} !important;
  border: 1px solid ${COLORS.INPUT_BACKGROUND};
  height: 100%;
  width: 100%;

  :focus-within {
    outline: none;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    background-color: transparent !important;
    color: white !important;
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px ${COLORS.INPUT_BACKGROUND} inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  &[data-autocompleted] {
    background-color: transparent !important;
    color: white !important;
  }
`;

export const SubLabel = styled.div`
  font-size: 14px;
  color: #bdbdbd;
`;

export const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40vh;
  width: 100%;
  color: white;
`;

export const Divider = styled.div<{
  color?: 'dark' | 'light';
  marginY?: string;
}>`
  width: 100%;
  height: 1px;
  background-color: ${({ color }) =>
    color === 'dark' ? COLORS.INPUT_BORDER() : 'rgba(224, 224, 224, 0.35)'};
  margin: ${({ marginY }) => marginY || 0} 0;
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #e0dddd;
  font-size: 13px;
  font-weight: normal;
  gap: 5px;
  width: 100%;
  padding: 4px 8px;
  cursor: pointer;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  &:hover {
    background-color: ${COLORS.MENU_HOVER};
  }
`;

export const LinkButton = styled.a`
  text-decoration: none;
  color: inherit;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const CustomScrollbar = styled.div<{ backgroundColor?: string }>`
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ backgroundColor }) =>
      backgroundColor || COLORS.SCROLLBAR_BACKGROUND};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.SCROLLBAR_THUMB};
    border-radius: 20px;
    border: 3px solid
      ${({ backgroundColor }) => backgroundColor || COLORS.SCROLLBAR_BACKGROUND};
  }
`;

export const Link = styled.button`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  color: ${COLORS.PRIMARY};
  background-color: transparent;
  border: none;
  font-size: 16px;
  text-decoration: underline;
`;
