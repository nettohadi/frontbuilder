import React, { FC } from "react";
import { customElementProp } from "../../types";
import { BsImageFill } from "react-icons/bs";
import styled from "styled-components";

const Image: FC<customElementProp> = ({ element, parent, className }) => {
  if (String(element.props.src).trim() === "") {
    return (
      <div
        className={`element ${className}`}
        data-testid={element["data-testid"]}
      >
        <EmptyImage>
          <BsImageFill size={40} />
        </EmptyImage>
      </div>
    );
  }
  return (
    <img
      className={`element ${className}`}
      data-testid={element["data-testid"]}
      src={element.props.src}
      alt=""
    />
  );
};

export default Image;

export const ImageElement = {
  id: "0.1.1",
  uuid: "0.1.4",
  type: "Image",
  isFunctionComponent: true,
  contentIsEditable: false,
  className: "fr-image",
  props: {
    name: "Image",
    padding: "0px",
    margin: "0px",
    width: "100px",
    maxWidth: "100%",
    height: "100px",
    src: "",
    objectFit: "contain",
    objectPosition: "center",
    backgroundColor: "transparent",
    visibility: "visible",
  },
  children: [],
};

const EmptyImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cecdcd;
  color: grey;
`;
