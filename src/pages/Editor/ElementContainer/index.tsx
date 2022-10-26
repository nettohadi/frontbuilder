import React, { useContext } from 'react';
import styled from 'styled-components';

import { getAllRegisteredElements } from '@src/utils';
import PageData from '@src/context';
import { draggableEvent } from '@src/pages/Editor/events';
import { generateElementTestId } from '@src/utils/tests';
import * as S from './styles';

const Elements = () => {
  const rerender = useContext(PageData);
  const elements = getAllRegisteredElements();
  return (
    <S.ElementsWrapper>
      <HeadingContainer>
        <h3>Elements</h3>
      </HeadingContainer>
      <StylesGroup>Basic</StylesGroup>
      <S.ElementsContainer>
        {Object.keys(elements).map((key) => {
          const element = elements[key].data;
          const Icon = elements[key].icon;
          return (
            <S.ElementBlockWrapper>
              <S.ElementBlock
                data-testid={generateElementTestId(element)}
                className="selectable"
                key={key}
                {...draggableEvent(element, null, rerender, true)}
              >
                <S.ElementIconWrapper
                  customSize={element.type.toLowerCase() === 'button' ? 30 : 20}
                >
                  <Icon />
                </S.ElementIconWrapper>
                {key}
              </S.ElementBlock>
            </S.ElementBlockWrapper>
          );
        })}
      </S.ElementsContainer>
    </S.ElementsWrapper>
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
  padding-left: 10px;
  font-size: 14px;
  font-weight: 600;
`;
