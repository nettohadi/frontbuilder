import React, { FC } from "react";
import Renderer from "../Renderer";
import { customElementProp, ElementType } from "../../types";
import styled from "styled-components";

const Box: FC<customElementProp> = ({ element, parent, className }) => {
  return (
    <div
      className={`element ${
        element.props.name !== "Root" ? "dotted-border" : ""
      } ${className}`}
      data-testid={element["data-testid"]}
    >
      {element.children.length === 0 && !parent && (
        <EmptyElement>Drop elements here</EmptyElement>
      )}
      {element.children.map((child: string | ElementType, i: number) => {
        return <Renderer key={i} element={child} parent={element} index={i} />;
      })}
    </div>
  );
};

export default Box;

export const BoxElement: ElementType = {
  id: "0.1.1",
  uuid: "0.1.1",
  type: "Box",
  isFunctionComponent: true,
  contentIsEditable: false,
  className: "fr-box droppable",
  props: {
    name: "Box",
    padding: "0px",
    margin: "0px",
    backgroundColor: "rgb(255 255 255 / 0)",
    backgroundImage: "",
    backgroundSize: "contain",
    backgroundPosition: "left",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "normal",
    height: "100px",
    width: "100px",
    maxWidth: "unset",
    display: "flex",
    visibility: "visible",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderColor: "rgb(255 255 255 / 0)",
    borderWidth: 0,
    borderStyle: "solid",
    borderRadius: "0px",
  },
  children: [],
};

const EmptyElement = styled.div`
  font-weight: 400;
  font-style: italic;
  color: #424242;
  font-size: 15px;
  border: 1px dashed #3a3838;
  width: 95%;
  height: 95%;
  max-width: 400px;
  max-height: 400px;
  min-height: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
