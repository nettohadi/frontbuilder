import React, { useContext } from 'react';
import { getAllRegisteredElements } from '@src/utils';
import './index.css';
import PageData from '@src/context';
import { draggableEvent } from '@src/pages/Editor/events';
import { generateElementTestId } from '@src/utils/tests';

const ElementContainer = () => {
  const rerender = useContext(PageData);
  const elements = getAllRegisteredElements();
  return (
    <div id="elements-wrapper">
      <h1>Elements</h1>
      <div className="elements-container">
        {Object.keys(elements).map((key) => {
          const element = elements[key].data;
          return (
            <div
              className="element-block"
              data-testid={generateElementTestId(element)}
              key={key}
              {...draggableEvent(element, null, rerender, true)}
            >
              {key}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElementContainer;
