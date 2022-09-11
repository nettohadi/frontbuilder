import React, { ReactNode } from 'react';
import { commonEvent } from '@src/common/events';
import { ElementType } from '@src/types';
import { current } from '@src/common/current';

const Button = (data: ElementType, parent: ElementType) => {
  console.log('render button');
  return (
    <button
      className={`selectable element ${
        current.getElement() === data ? 'selected' : ''
      } ${data.props.className}`}
      {...commonEvent(data, parent)}
      style={data.props.style}
    >
      {data.children as ReactNode}
    </button>
  );
};

export default Button;
