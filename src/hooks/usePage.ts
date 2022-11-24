import { useEffect, useState } from 'react';
import data from '@src/data';
import pages from '@src/api/pages';
import { useParams } from 'react-router-dom';
import { current } from '@src/common/current';

const usePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const params = useParams<{ websiteId: string; pageId: string }>();
  current.websiteId = params.websiteId || '';

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      try {
        const response = (await pages.getById(params.pageId || '')) as any;

        if (response.status === 406) {
          throw new Error('Page not found');
        }

        if (response.status !== 200) {
          throw new Error('Something went wrong');
        }

        if (response.status === 200) {
          current.page = response.data;
          data.set(response.data.draft);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [params.pageId]);

  return { isLoading, page: data.get(), error };
};

export default usePage;
