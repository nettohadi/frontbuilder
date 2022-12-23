import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import pages from '@src/api/pages';
import Loading from '@components/Loading';
import styled from 'styled-components';

const RedirectToEditor = () => {
  const navigate = useNavigate();
  const params = useParams<{ websiteId: string; pageId: string }>();

  useEffect(() => {
    const redirect = async () => {
      try {
        const { website, page } = await pages.getDefault();
        navigate(`/${website?.id}/${page?.id}`);
      } catch (e: any) {
        if (e?.code === 404) {
          navigate('/signIn');
        }
      }
    };

    if (!params.websiteId && !params.pageId) {
      redirect();
    }
  }, [params.websiteId, params.pageId, navigate]);

  return (
    <Container>
      <Loading
        color="white"
        height="500px"
        size={25}
        text="Redirecting to editor..."
      />
    </Container>
  );
};

export default RedirectToEditor;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
`;
