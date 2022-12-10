import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import pages from '@src/api/pages';

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

  return <div>Redirecting ...</div>;
};

export default RedirectToEditor;
