import React, { FC, ReactNode } from 'react';
import { customElementProp } from '@src/types';

const Video: FC<customElementProp> = ({ element, parent }) => {
  return (
    <div
      className="element"
      data-testid={element['data-testid']}
      style={{
        ...element.props,
        width: '100%',
        height: '100%',
        margin: 0,
      }}
    >
      {element.children as ReactNode}
    </div>
  );
};

export default Video;

export const VideoElement = {
  id: '0.1.1',
  uuid: '0.1.6',
  type: 'Video',
  isFunctionComponent: true,
  contentIsEditable: false,
  className: 'fr-video',
  props: {
    name: 'Video',
    height: '50px',
    width: '100px',
    padding: '0px',
    margin: '0px',
    backgroundColor: 'rgb(159,116,238)',
  },
  children: [],
};
