import React, { FC, ReactNode } from 'react';
import { commonEvent } from '@src/common/events';
import { customElementProp, ElementType } from '@src/types';
import { current } from '@src/common/current';

const Button: FC<customElementProp> = ({ element, parent }) => {
  console.log('render button');
  return (
    <button
      className={`selectable element ${
        current.getElement() === element ? 'selected' : ''
      } ${element.props.className}`}
      {...commonEvent(element, parent)}
      style={element.props.style}
    >
      {element.children as ReactNode}
    </button>
  );
};

export default Button;
