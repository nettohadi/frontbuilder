import React, { FC } from 'react';
import { customElementProp, ElementType } from '@src/types';
import { getCommonPropGroups } from '@src/utils/helperFunctions';

const Paragraph: FC<customElementProp> = ({ element, parent }) => {
  const { textContent, ...otherProps } = element.props;
  return (
    <p
      className="element dotted-border"
      data-testid={element['data-testid']}
      style={{
        ...otherProps,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
      dangerouslySetInnerHTML={{ __html: textContent }}
    />
  );
};

export default Paragraph;

export const ParagraphElement: ElementType = {
  id: '0.1.1',
  uuid: '0.1.5',
  type: 'Paragraph',
  isFunctionComponent: true,
  contentIsEditable: true,
  className: 'fr-paragraph',
  props: {
    name: 'Paragraph',
    textContent: 'Paragraph',
    padding: '0px',
    margin: '0px',
    width: '100px',
  },
  hiddenProps: ['textContent'],
  propGroups: getCommonPropGroups(),
  children: [],
};
