import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';

const Button: FC<customElementProp> = ({ element, parent }) => {
  return (
    <button
      className="element"
      data-testid={element.props['data-testid']}
      style={{
        ...element.props.style,
        width: '100%',
        height: '100%',
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
      backgroundColor: 'white',
      color: 'black',
      height: '60px',
      width: '100px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '5px',
    },
  },
  children: ['Button'],
};
