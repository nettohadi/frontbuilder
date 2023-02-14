import React, { FC } from "react";
import { customElementProp, ElementType } from "../../types";

const Paragraph: FC<customElementProp> = ({ element, parent, className }) => {
  const { textContent } = element.props;
  return (
    <p
      className={`element dotted-border ${className}`}
      data-testid={element["data-testid"]}
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  );
};

export default Paragraph;

export const ParagraphElement: ElementType = {
  id: "0.1.1",
  uuid: "0.1.5",
  type: "Paragraph",
  isFunctionComponent: true,
  contentIsEditable: true,
  className: "fr-paragraph",
  props: {
    name: "Paragraph",
    textContent: "Paragraph",
    padding: "0px",
    margin: "0px",
    width: "100px",
    visibility: "visible",
    color: "black",
    fontSize: 16,
    textAlign: "left",
    maxWidth: "unset",
    lineHeight: "inherit",
    fontFamily: "arial",
    minHeight: "auto",
  },
  hiddenProps: ["textContent"],
  children: [],
};
