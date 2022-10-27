import React, { FC } from 'react';
import Render from '@components/Render';
import { customElementProp, ElementType } from '@src/types';
import { getCommonPropGroups } from '@src/utils/helperFunctions';

const Box: FC<customElementProp> = ({ element, parent }) => {
  return (
    <div
      className={`element dotted-border`}
      style={{
        ...element.props,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
      data-testid={element['data-testid']}
    >
      {element.children.map((child: string | ElementType, i: number) => {
        return <Render key={i} element={child} parent={element} index={i} />;
      })}
    </div>
  );
};

export default Box;

export const BoxElement: ElementType = {
  id: '0.1.1',
  type: 'Box',
  isFunctionComponent: true,
  contentIsEditable: false,
  className: 'fr-box droppable',
  props: {
    name: 'Box',
    padding: '0px',
    margin: '0px',
    backgroundColor: 'rgb(255, 255, 255)',
    height: '100px',
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  propGroups: getCommonPropGroups(),
  children: [],
};
