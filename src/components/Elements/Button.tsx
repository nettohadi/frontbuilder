import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';
import { getCommonPropGroups } from '@src/utils/helperFunctions';

const Button: FC<customElementProp> = ({ element, parent }) => {
  const { textContent, ...otherProps } = element.props;
  return (
    <div
      className="element el-button"
      data-testid={element.props['data-testid']}
      style={{
        ...otherProps,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
    >
      {(textContent as ReactNode) || ''}
    </div>
  );
};

export default Button;

export const ButtonElement = {
  id: '2',
  type: 'Button',
  isFunctionComponent: true,
  contentIsEditable: true,
  className: 'fr-button',
  props: {
    textContent: 'Button',
    backgroundColor: 'grey',
    color: 'black',
    height: '60px',
    width: '100px',
    fontWeight: 'bold',
    fontSize: 16,
    border: 'none',
    borderRadius: '5px',
    padding: '0px',
    margin: '0px',
  },
  propGroups: getCommonPropGroups(),
  children: [''],
};
