import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';
import { getCommonPropGroups } from '@src/utils/helperFunctions';

const Heading: FC<customElementProp> = ({ element, parent }) => {
  const { textContent, ...otherProps } = element.props;
  return (
    <h1
      className="element"
      data-testid={element['data-testid']}
      style={{
        ...otherProps,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
    >
      {(textContent as ReactNode) || ''}
    </h1>
  );
};

export default Heading;

export const HeadingElement = {
  id: '2',
  type: 'Heading',
  isFunctionComponent: true,
  contentIsEditable: true,
  className: 'fr-heading',
  props: {
    name: 'Heading',
    textContent: 'Heading',
    padding: '0px',
    margin: '0px',
    color: 'black',
    width: '100px',
    height: '100px',
  },
  propGroups: getCommonPropGroups(),
  children: [''],
};
