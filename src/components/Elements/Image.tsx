import React, { FC } from 'react';
import { customElementProp } from '@src/types';
import { getCommonPropGroups } from '@src/utils/helperFunctions';

const Image: FC<customElementProp> = ({ element, parent }) => {
  return (
    <img
      className="element"
      data-testid={element.props['data-testid']}
      style={{
        ...element.props,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
      src="https://hadi-syahbal.com/storage/images/Hadi_1.jpg"
      alt="Hadi Syahbal"
    />
  );
};

export default Image;

export const ImageElement = {
  id: '2',
  type: 'Image',
  isFunctionComponent: true,
  contentIsEditable: false,
  className: 'fr-image',
  props: {
    padding: '0px',
    margin: '0px',
    width: '100px',
    height: '100px',
  },
  propGroups: getCommonPropGroups(),
  children: [],
};
