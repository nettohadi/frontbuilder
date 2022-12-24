import styled from "styled-components";
import { FaRegSadCry } from "react-icons/fa";

const Page404 = () => {
  return (
    <Wrapper>
      <div className="page-404-icon">
        4<FaRegSadCry color={"#4bcccc"} size={80} />4
      </div>
      <h1>Oops, this is embarrassing.</h1>
      <h3>{"We can't find the page you're looking for."}</h3>
      <div className="description">
        {"Either the page was deleted or you have a typo."}
      </div>
    </Wrapper>
  );
};

export default Page404;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  gap: 10px;
  background-color: #24344c;
  color: #fafafa;
  text-align: center;

  .page-404-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3px;
    font-size: 100px;
    margin-bottom: 30px;
    line-height: 100px;
  }

  .description {
    margin-top: 10px;
  }
`;
