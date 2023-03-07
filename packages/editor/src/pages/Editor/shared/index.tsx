import styled from 'styled-components';

export const HeadingContainer = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 7px;
  color: white;
  width: 100%;
  text-align: center;
`;

const PlaceholderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Instruction = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #424242;
  text-align: center;
  font-style: italic;
  border: 1px dashed #3a3838;
  padding: 40px;
`;

export const RootPlaceholder = () => {
  return (
    <PlaceholderContainer>
      <Instruction>Drop elements here</Instruction>
    </PlaceholderContainer>
  );
};

export const Logo = styled.img<{ size?: string; padding?: string }>`
  width: ${(props) => props.size || '26px'};
  height: ${(props) => props.size || '26px'};
  object-fit: cover;
  padding: ${(props) => props.padding || '2px'};
`;
