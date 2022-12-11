import React, { FC } from "react";
import { customElementProp } from "../../types";

const Heading: FC<customElementProp> = ({ element, parent, className }) => {
  const { textContent } = element.props;
  return (
    <h1
      className={`element dotted-border ${className}`}
      data-testid={element["data-testid"]}
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  );
};

export default Heading;

export const HeadingElement = {
  id: "0.1.1",
  uuid: "0.1.3",
  type: "Heading",
  isFunctionComponent: true,
  contentIsEditable: true,
  className: "fr-heading",
  props: {
    name: "Heading",
    textContent: "Heading",
    padding: "0px",
    margin: "0px",
    color: "rgb(0, 0, 0)",
    width: "100px",
    height: "100px",
  },
  hiddenProps: ["textContent"],
  children: [],
};
