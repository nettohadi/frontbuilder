import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';

const Video: FC<customElementProp> = ({ element, parent }) => {
  return (
    <div
      className="element"
      data-testid={element.props['data-testid']}
      style={{
        ...element.props.style,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
    >
      <span>{element.children as ReactNode}</span>
    </div>
  );
};

export default Video;

export const VideoElement = {
  id: '2',
  type: 'Video',
  isFunctionComponent: true,
  props: {
    className: 'fr-heading',
    style: {
      padding: '0px',
      margin: '0px',
    },
  },
  children: ['Video'],
};