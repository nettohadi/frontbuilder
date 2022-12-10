import React, { FC, ReactNode } from 'react';
import { customElementProp, ElementType } from '@src/types';

const Button: FC<customElementProp> = ({ element, parent, className }) => {
  const { textContent } = element.props;
  return (
    <div
      className={`element el-button ${className}`}
      data-testid={element['data-testid']}
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
  children: [],
};
