import React, { FC } from 'react';
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
      dangerouslySetInnerHTML={{ __html: `${element.props.textContent}` }}
    ></p>
  );
};

export default Paragraph;

export const ParagraphElement = {
  id: '2',
  type: 'Paragraph',
  isFunctionComponent: true,
  props: {
    className: 'fr-paragraph',
    textIsEditable: true,
    textContent: 'Paragraph',
    style: {
      padding: '0px',
      margin: '0px',
      width: '90%',
      minHeight: 50,
    },
  },
  children: [''],
};
