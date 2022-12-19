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
  padding: 10px 8px;
  cursor: pointer;

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 140px;
    flex-grow: 1;
  }

  .check-mark {
    max-width: 15px;
    height: 15px;
  }

  &:hover {
    background-color: #504f4f;
  }
`;

export const PagesContainer = styled.div`
  padding: 0 6px;
`;
