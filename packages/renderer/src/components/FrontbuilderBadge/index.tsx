import styled from "styled-components";
import React from "react";

const FrontbuilderBadge = () => {
  return (
    <a href="https://frontbuilder.net">
      <Wrapper>
        <div className="logo"></div>
        Made in Fontbuilder
      </Wrapper>
    </a>
  );
};

export default FrontbuilderBadge;

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: rgb(255, 197, 20);
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 8px 10px;
  border-radius: 40px;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid grey;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px,
    rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;

  :hover {
    background-color: #100f0f;
    color: rgb(255, 197, 20);

    .logo {
      background-image: url("/frontbuilder_logo_yellow.png");
    }
  }

  .logo {
    width: 14px;
    height: 14px;
    background-size: cover;
    background-image: url("/frontbuilder_logo_black.png");
  }
`;
