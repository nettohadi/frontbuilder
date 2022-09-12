import React, { FC } from 'react';
import Render from '@components/Render';
import { customElementProp, ElementType } from '@src/types';

const Box: FC<customElementProp> = ({ element, parent }) => {
  return (
    <div className="element">
      {element.children.map((child: string | ElementType, i: number) => {
        return <Render key={i} element={child} parent={parent} index={i} />;
      })}
    </div>
  );
};

export default Box;
