import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: rgb(64, 64, 64);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto;
  width: 600px;
  background-color: white;
  border-radius: 5px;
  gap: 15px;
  padding: 40px;
`;

export const GoogleButton = styled.button`
  border: 2px solid #09757a;
  color: #09757a;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: center;
  height: 50px;
  width: 100%;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
`;

export const SignInButton = styled.button`
  border: 0px solid grey;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  background-color: #088f93;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

export const Input = styled.input`
  border: 0px solid grey;
  border-radius: 5px;
  background-color: rgba(128, 128, 128, 0.25);
  height: 40px;
  width: 100%;
  padding: 10px;
`;

export const SubLabel = styled.div`
  font-size: 14px;
  color: #626060;
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
