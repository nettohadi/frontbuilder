import React, { FC, ReactNode } from 'react';
import { customElementProp, ElementType } from '@src/types';
import { getCommonPropGroups } from '@src/utils/helperFunctions';

const Button: FC<customElementProp> = ({ element, parent }) => {
  const { textContent, ...otherProps } = element.props;
  return (
    <div
      className="element el-button"
      data-testid={element['data-testid']}
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

export const ButtonElement: ElementType = {
  id: '0.1.1',
  uuid: '0.1.2',
  type: 'Button',
  isFunctionComponent: true,
  contentIsEditable: true,
  className: 'fr-button',
  props: {
    name: 'Button',
    textContent: 'Button',
    backgroundColor: 'rgb(128, 128, 128)',
    color: 'rgb(0, 0, 0)',
    height: '60px',
    width: '100px',
    maxWidth: '100%',
    fontWeight: '700',
    fontSize: '16px',
    border: '0px none rgb(0, 0, 0)',
    borderRadius: '5px',
    padding: '0px',
    margin: '0px',
  },
  propGroups: getCommonPropGroups(),
  children: [],
};
