import React, { FC } from 'react';
import Render from '@components/Render';
import { customElementProp, ElementType } from '@src/types';

const Box: FC<customElementProp> = ({ element, parent }) => {
  return (
    <div
      className="element"
      style={{ ...element.props.style, width: '100%', height: '100%' }}
      data-testid={element.props['data-testid']}
    >
      {element.children.map((child: string | ElementType, i: number) => {
        return <Render key={i} element={child} parent={element} index={i} />;
      })}
    </div>
  );
};

export default Box;

export const BoxElement: ElementType = {
  id: '1',
  type: 'Box',
  isFunctionComponent: true,
  props: {
    className: 'fr-box droppable',
    style: {
      padding: '20px',
      backgroundColor: 'white',
      height: '60px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  children: [],
};
