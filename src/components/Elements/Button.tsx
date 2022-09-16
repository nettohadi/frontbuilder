import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';

const Button: FC<customElementProp> = ({ element, parent }) => {
  return (
    <button
      className="element"
      style={{
        ...element.props.style,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {element.children as ReactNode}
    </button>
  );
};

export default Button;

export const ButtonElement = {
  type: 'Button',
  isFunctionComponent: true,
  props: {
    className: 'button',
    style: {
      backgroundColor: 'yellow',
      height: '40px',
      width: 'auto',
    },
  },
  children: ['Button'],
};
