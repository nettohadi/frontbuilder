import styled from "styled-components";
import { FaRegSadCry } from "react-icons/fa";

const UnPublishedPage = () => {
  return (
    <Wrapper>
      <div className="empty-page-icon">
        <FaRegSadCry />
        {"Empty Page"}
      </div>
      <h2>This page is still empty</h2>
      <div className="description">
        {"It looks like you haven't publish the page."}
      </div>
    </Wrapper>
  );
};

export default UnPublishedPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  gap: 5px;
  background-color: #24344c;
  color: #fafafa;

  .empty-page-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: 45px;
    margin-bottom: 30px;
    line-height: 45px;
  }

  .description {
    margin-top: 10px;
  }
`;
