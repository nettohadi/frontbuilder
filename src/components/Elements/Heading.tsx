import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';

const Heading: FC<customElementProp> = ({ element, parent }) => {
  return (
    <h1
      className="element"
      data-testid={element.props['data-testid']}
      style={{
        ...element.props.style,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
    >
      {(element.props.textContent as ReactNode) || ''}
    </h1>
  );
};

export default Heading;

export const HeadingElement = {
  id: '2',
  type: 'Heading',
  isFunctionComponent: true,
  props: {
    className: 'fr-heading',
    textIsEditable: true,
    textContent: 'Heading',
    style: {
      padding: '0px',
      margin: '0px',
    },
  },
  children: [''],
};
