import React, { FC, ReactNode } from 'react';
// import { commonEvent } from '@src/common/events';
import { customElementProp } from '@src/types';
// import { current } from '@src/common/current';

const Button: FC<customElementProp> = ({ element, parent }) => {
  return <button className="element">{element.children as ReactNode}</button>;
};

export default Button;
