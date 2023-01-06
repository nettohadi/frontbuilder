import React, { FC } from "react";
import { customElementProp } from "../../types";

const onlyValidHeading = (headingType: string = "h1") => {
  const validHeadingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];
  return validHeadingTypes.includes(headingType) ? headingType : "h1";
};
const Heading: FC<customElementProp> = ({ element, parent, className }) => {
  const { textContent } = element.props;
  const props = {
    className: `element dotted-border ${className}`,
    "data-testid": element["data-testid"],
    dangerouslySetInnerHTML: { __html: textContent },
  };

  return React.createElement(
    onlyValidHeading(element.props.headingType),
    props
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
    fontSize: "16px",
    visibility: "visible",
  },
  hiddenProps: ["textContent", "height"],
  children: [],
};
