import styled from "styled-components";
import { FaRegSadCry } from "react-icons/fa";
import CustomHead from "../src/CustomHead";
import React from "react";

const Page404 = () => {
  return (
    <>
      <CustomHead title={"Not Found"} />
      <Wrapper>
        <div className="page-404-icon">
          4<FaRegSadCry color={"#ea552b"} size={80} />4
        </div>
        <h1>Oops, this is embarrassing.</h1>
        <h3>{"We can't find the page you're looking for."}</h3>
        <div className="description">
          {"Either the page was deleted or you have a typo."}
        </div>
      </Wrapper>
    </>
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
  background-color: rgb(255, 197, 20);
  color: black;
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
