import React from 'react';
import Renderer from '@frontbuilder/renderer';
import usePage from '@src/hooks/usePage';
import Loading from '@components/Loading';
import styled from 'styled-components';
import { FrontbuilderBadge } from '@frontbuilder/renderer';

export default function Previewer() {
  const { isLoading, page } = usePage();
  if (isLoading) {
    return (
      <Container>
        <Loading
          color="white"
          height="500px"
          size={25}
          text="Loading the page..."
        />
      </Container>
    );
  }
  return (
    <>
      <FrontbuilderBadge />
      {!isLoading && <Renderer element={page} parent={null} />}
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
`;
