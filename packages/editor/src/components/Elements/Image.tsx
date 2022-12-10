import React, { FC } from 'react';
import { customElementProp } from '@src/types';

const Image: FC<customElementProp> = ({ element, parent, className }) => {
  return (
    <img
      className={`element ${className}`}
      data-testid={element['data-testid']}
      src="https://hadi-syahbal.com/storage/images/Hadi_1.jpg"
      alt="Hadi Syahbal"
    />
  );
};

export default Image;

export const ImageElement = {
  id: '0.1.1',
  uuid: '0.1.4',
  type: 'Image',
  isFunctionComponent: true,
  contentIsEditable: false,
  className: 'fr-image',
  props: {
    name: 'Image',
    padding: '0px',
    margin: '0px',
    width: '100px',
    height: '100px',
  },
  children: [],
};
