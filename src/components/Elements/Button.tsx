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
  id: '2',
  type: 'Button',
  isFunctionComponent: true,
  props: {
    className: 'fr-button',
    style: {
      backgroundColor: 'yellow',
      height: '60px',
      width: 'auto',
    },
  },
  children: ['Button'],
};
