import React from 'react';
import styled from 'styled-components';

import { commonEvent } from '../events';
import Resizer from '../Resizer';
import data from '@src/data';
import { current } from '@src/common/current';

const StyledDiv = styled.div<any>`
  width: ${(props) => props.size.width};
  height: ${(props) => props.size.height};
`;

const WithEditHandler = (Component: any) => {
  const NewComponent = ({ element, parent }: any) => {
    const [style, setStyle] = React.useState({
      width: element.props.style.width,
      height: element.props.style.height,
    });
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const getRect = () => {
      return wrapperRef.current
        ? wrapperRef.current.getBoundingClientRect()
        : null;
    };

    React.useEffect(() => {
      element.props.style = { ...element.props.style, ...style };
    }, [style, element]);

    const persistToLocalStorage = () => {
      // save data to local storage
      data.persistToLocalStorage();
    };

    return (
      <StyledDiv
        data-testid="edit-handler-wrapper"
        ref={wrapperRef}
        className={`selectable ${
          element.props.className
        } edit-handler-wrapper ${
          current.getElement() === element ? 'selected' : ''
        }`}
        {...commonEvent(element, parent)}
        size={style}
      >
        <Component element={element} parent={parent} />
        <Resizer
          setStyle={setStyle}
          getRect={getRect}
          persistToLocalStorage={() => persistToLocalStorage()}
        />
      </StyledDiv>
    );
  };

  return NewComponent;
};

export default WithEditHandler;
