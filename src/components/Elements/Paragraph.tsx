import React, { FC } from 'react';
import { customElementProp, ElementType } from '@src/types';
import { getCommonPropGroups } from '@src/utils/helperFunctions';

const Paragraph: FC<customElementProp> = ({ element, parent }) => {
  const { textContent, ...otherProps } = element.props;
  return (
    <p
      className="element"
      data-testid={element['data-testid']}
      style={{
        ...otherProps,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
      dangerouslySetInnerHTML={{ __html: `${textContent}` }}
    ></p>
  );
};

export default Paragraph;

export const ParagraphElement: ElementType = {
  id: '2',
  type: 'Paragraph',
  isFunctionComponent: true,
  contentIsEditable: true,
  className: 'fr-paragraph',
  props: {
    textContent: 'Paragraph',
    padding: '0px',
    margin: '0px',
    width: '90%',
    minHeight: 50,
  },
  hiddenProps: ['textContent'],
  propGroups: getCommonPropGroups(),
  children: [''],
};
