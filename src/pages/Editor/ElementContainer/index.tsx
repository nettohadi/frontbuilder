import React, { useContext } from 'react';
import { getAllRegisteredElements } from '@src/utils';
import './index.css';
import PageData from '@src/context';
import { draggableEvent } from '@src/pages/Editor/events';
import { generateElementTestId } from '@src/utils/tests';
import styled from 'styled-components';

const Elements = () => {
  const rerender = useContext(PageData);
  const elements = getAllRegisteredElements();
  return (
    <div id="elements-wrapper">
      <HeadingContainer>
        <h3>Elements</h3>
      </HeadingContainer>
      <StylesGroup>Basic</StylesGroup>
      <div className="elements-container">
        {Object.keys(elements).map((key) => {
          const element = elements[key].data;
          const Icon = elements[key].icon;
          return (
            <div
              className="element-block"
              data-testid={generateElementTestId(element)}
              key={key}
              {...draggableEvent(element, null, rerender, true)}
            >
              <div
                className={`element-icon-wrapper icon-${element.type.toLowerCase()}`}
              >
                <Icon />
              </div>
              {key}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Elements;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 7px;
`;

const StylesGroup = styled.div`
  display: flex;
  background-color: rgb(43 43 43);
  color: white;
  padding: 8px 6px;
  padding-left: 20px;
  font-size: 14px;
  font-weight: 600;
`;
