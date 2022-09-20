import React, { useContext } from 'react';
import { getAllCustomComponents } from '@src/utils';
import './index.css';
import PageData from '@src/context';
import { draggableEvent } from '@src/pages/Editor/events';
import { generateElementTestId } from '@src/utils/tests';

const ElementContainer = () => {
  const rerender = useContext(PageData);
  const components = getAllCustomComponents();
  return (
    <div id="elements-wrapper">
      <h1>Elements</h1>
      <div className="elements-container">
        {Object.keys(components).map((key) => (
          <div
            className="element-block"
            data-testid={generateElementTestId(components[key].data)}
            key={key}
            {...draggableEvent(components[key].data, null, rerender, true)}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementContainer;
