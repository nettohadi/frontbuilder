import React, { FC } from 'react';
import Render from '@components/Render';
import { customElementProp, ElementType } from '@src/types';

const Box: FC<customElementProp> = ({ element, parent }) => {
  return (
    <div
      className="element"
      style={{ ...element.props.style, width: '100%', height: '100%' }}
    >
      {element.children.map((child: string | ElementType, i: number) => {
        return <Render key={i} element={child} parent={element} index={i} />;
      })}
    </div>
  );
};

export default Box;

export const BoxElement = {
  type: 'Box',
  isFunctionComponent: true,
  props: {
    className: 'box droppable',
    style: {
      padding: '20px',
      height: '40px',
      width: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  children: [],
};
