import React from 'react';
import { ElementType, ParentType } from '@src/types';
import { getRegisteredElement } from '@src/utils';

interface renderProps {
  element: ElementType | string;
  parent?: ParentType;
  index?: number;
}
const Render = ({ element, parent, index }: renderProps) => {
  // render a text node
  if (typeof element === 'string') {
    return <>{element}</>;
  }

  // render a custom component
  if (element.isFunctionComponent) {
    const CustomComponent = getRegisteredElement(element.type).component;
    return <CustomComponent element={element} parent={parent} />;
  }

  // render a native html node
  const { style, ...otherProps } = element.props;
  const newStyle = { ...style, position: 'relative' };
  return React.createElement(
    element.type,
    { ...otherProps, style: newStyle, id: element.id },
    element.children.map((child, i) => {
      return <Render key={i} element={child} parent={element} index={i} />;
    })
  );
};

export default Render;
