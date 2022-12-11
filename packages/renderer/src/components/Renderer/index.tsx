import React from "react";

import { ElementType, ParentType } from "../../types";
import { getRegisteredElement } from "../../utils";

interface renderProps {
  element: ElementType | string;
  parent?: ParentType;
  index?: number;
}
const Renderer = ({ element, parent, index }: renderProps) => {
  // render a text node
  if (typeof element === "string") {
    return <>{element}</>;
  }

  // render a custom component
  if (element.isFunctionComponent) {
    const CustomComponent = getRegisteredElement(element.type).component;
    // set element id
    element.id = `${parent?.id || "0"}.${(index || 0) + 1}`;
    element.getParent = () => parent;
    return <CustomComponent element={element} parent={parent} />;
  }

  // render a native html node
  const { style, ...otherProps } = element.props;
  const newStyle = { ...style, position: "relative" };
  return React.createElement(
    element.type,
    { ...otherProps, style: newStyle, id: element.id },
    element.children.map((child: any, i: number) => {
      return <Renderer key={i} element={child} parent={element} index={i} />;
    })
  );
};

export default Renderer;
