import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';

const Button: FC<customElementProp> = ({ element, parent }) => {
  return <button className="element">{element.children as ReactNode}</button>;
};

export default Button;
