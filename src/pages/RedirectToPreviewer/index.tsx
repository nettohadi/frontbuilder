import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import pages from '@src/api/pages';

const RedirectToPreviewer = () => {
  const navigate = useNavigate();
  const params = useParams<{ websiteId: string; pageId: string }>();

  if (!params.websiteId && !params.pageId) {
    navigate(`/editor/${params.websiteId}/${params.pageId}`);
  }

  useEffect(() => {
    const redirect = async () => {
      const { website, page } = await pages.getDefault();
      navigate(`/preview/${website?.id}/${page?.id}`);
    };

    if (!params.websiteId && !params.pageId) {
      redirect();
    }
  }, [navigate, params.websiteId, params.pageId]);

  return <div>Redirecting ...</div>;
};

export default RedirectToPreviewer;
