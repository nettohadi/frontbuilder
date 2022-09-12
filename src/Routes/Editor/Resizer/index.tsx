import React from 'react';
import { commonEvent } from '@src/Routes/Editor/events';
import { customElementProp } from '@src/types';

const Resizer = (Component: any) => {
  return ({ element, parent }: customElementProp) => (
    <div
      className={`selectable ${element.props.className}`}
      {...commonEvent(element, parent)}
      style={element.props.style}
    >
      <Component element={element} parent={parent} />
      <Controls />
    </div>
  );
};

export default Resizer;

const Controls = () => {
  return (
    <>
      <span
        onMouseDown={() => {}}
        className="height-sizer button-edit"
        style={{
          left: 'calc(50% - 5px)',
          bottom: -5,
        }}
      ></span>
      <span
        onMouseDown={() => {}}
        className="width-sizer button-edit"
        style={{
          right: -5,
          top: 'calc(50% - 10px)',
        }}
      ></span>
    </>
  );
};
