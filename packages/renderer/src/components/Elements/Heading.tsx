import React, { FC } from "react";
import { customElementProp } from "../../types";

const Heading: FC<customElementProp> = ({ element, parent, className }) => {
  const { textContent } = element.props;
  const props = {
    className: `element dotted-border ${className}`,
    "data-testid": element["data-testid"],
    dangerouslySetInnerHTML: { __html: textContent },
  };

  switch (element.props.headingType) {
    case "h1":
      return <h1 {...props} />;
    case "h2":
      return <h2 {...props} />;
    case "h3":
      return <h3 {...props} />;
    case "h4":
      return <h4 {...props} />;
    case "h5":
      return <h5 {...props} />;
    case "h6":
      return <h6 {...props} />;
    default:
      return <h1 {...props} />;
  }
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
    headingType: "h1",
    padding: "0px",
    margin: "0px",
    color: "rgb(0, 0, 0)",
    width: "auto",
    height: "auto",
    textTransform: "capitalize",
    textDecoration: "none",
    textAlign: "left",
    fontStyle: "normal",
  },
  hiddenProps: ["textContent", "height"],
  children: [],
};
