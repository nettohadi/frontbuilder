import styled from "styled-components";
import { FaRegSadCry } from "react-icons/fa";

const UnPublishedPage = () => {
  return (
    <Wrapper>
      <div className="empty-page-icon">
        <FaRegSadCry color={"#ea552b"} />
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
  gap: 10px;
  background-color: rgb(255, 197, 20);
  color: black;
  text-align: center;

  .empty-page-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: 80px;
    margin-bottom: 30px;
    line-height: 100px;
  }

  .description {
    margin-top: 10px;
  }
`;
