import styled from 'styled-components';

export const PageItem = styled.div`
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
    background-color: #504f4f;
  }
`;

export const PagesContainer = styled.div`
  padding: 0 6px;
`;

export const IconBox = styled.div`
  width: 15px;
  height: 10px;
`;
