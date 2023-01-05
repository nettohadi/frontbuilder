import styled from "styled-components";
import { FaRegSadCry } from "react-icons/fa";
import CustomHead from "../src/CustomHead";
import React from "react";

const Page500 = () => {
  return (
    <>
      <CustomHead title={"Error"} />
      <Wrapper>
        <div className="page-500-icon">
          5<FaRegSadCry color={"#ea552b"} size={80} />
          <FaRegSadCry color={"#ea552b"} size={80} />
        </div>
        <h1>Oops, something is not right.</h1>
        <div className="description">
          {"We will fix this as soon as possible. Please try again later."}
        </div>
      </Wrapper>
    </>
  );
};

export default Page500;

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

  .page-500-icon {
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
