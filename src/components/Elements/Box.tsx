import React, { FC } from 'react';
import Render from '@components/Render';
import { customElementProp, ElementType } from '@src/types';
import { commonEvent } from '@src/common/events';
import { current } from '@src/common/current';

const Box: FC<customElementProp> = ({ element, parent }) => {
  const isSelected = current.getElement() === element ? 'selected' : '';
  const className = `selectable element ${isSelected} ${element.props.className}`;

  return (
    <div
      className={className}
      {...commonEvent(element, parent)}
      style={element.props.style}
    >
      {element.children.map((child: string | ElementType, i: number) => {
        return <Render key={i} element={child} parent={parent} index={i} />;
      })}
    </div>
  );
};

export default Box;
