import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';
import { getCommonPropGroups } from '@src/utils/helperFunctions';

const Heading: FC<customElementProp> = ({ element, parent }) => {
  const { textContent, ...otherProps } = element.props;
  return (
    <h1
      className="element"
      data-testid={element.props['data-testid']}
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
    textContent: 'Heading',
    padding: '0px',
    margin: '0px',
    color: 'black',
  },
  propGroups: getCommonPropGroups(),
  children: [''],
};
