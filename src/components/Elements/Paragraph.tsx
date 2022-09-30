import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';

const Paragraph: FC<customElementProp> = ({ element, parent }) => {
  return (
    <p
      className="element"
      data-testid={element.props['data-testid']}
      style={{
        ...element.props.style,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
    >
      <span>{element.children as ReactNode}</span>
    </p>
  );
};

export default Paragraph;

export const ParagraphElement = {
  id: '2',
  type: 'Paragraph',
  isFunctionComponent: true,
  props: {
    className: 'fr-heading',
    style: {
      padding: '0px',
      margin: '0px',
    },
  },
  children: ['Paragraph'],
};
