import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';

const Image: FC<customElementProp> = ({ element, parent }) => {
  return (
    <img
      className="element"
      data-testid={element.props['data-testid']}
      style={{
        ...element.props.style,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
      src="https://hadi-syahbal.com/storage/images/Hadi_1.jpg"
    />
  );
};

export default Image;

export const ImageElement = {
  id: '2',
  type: 'Image',
  isFunctionComponent: true,
  props: {
    className: 'fr-image',
    style: {
      padding: '0px',
      margin: '0px',
      width: '100px',
      height: '100px',
    },
  },
  children: [],
};
