import React, { FC, ReactNode } from "react";
import { customElementProp, ElementType } from "../../types";

const Button: FC<customElementProp> = ({ element, parent, className }) => {
  const { textContent } = element.props;
  return (
    <div
      className={`element el-button ${className}`}
      data-testid={element["data-testid"]}
    >
      {(textContent as ReactNode) || ""}
    </div>
  );
};

export default Button;

export const ButtonElement: ElementType = {
  id: "0.1.1",
  uuid: "0.1.2",
  type: "Button",
  isFunctionComponent: true,
  contentIsEditable: true,
  className: "fr-button",
  props: {
    name: "Button",
    textContent: "Button",
    backgroundColor: "rgb(128, 128, 128)",
    color: "rgb(0, 0, 0)",
    height: "50px",
    width: "100px",
    maxWidth: "100%",
    fontWeight: "700",
    fontSize: "16px",
    borderRadius: "0px",
    padding: "0px",
    margin: "0px",
    textTransform: "none",
    textDecoration: "none",
    fontStyle: "normal",
    borderColor: "rgb(128, 128, 128)",
    borderWidth: 1,
    borderStyle: "solid",
  },
  children: [],
};
