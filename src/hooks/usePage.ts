import { useEffect, useState } from 'react';
import { ElementType } from '@src/types';
import data from '@src/data';
import pages from '@src/api/pages';
import { useParams } from 'react-router-dom';
import { current } from '@src/common/current';

const usePage = () => {
  const [page, setPage] = useState<ElementType | string>(data.get());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const params = useParams<{ websiteId: string; pageId: string }>();
  current.websiteId = params.websiteId || '';
  current.pageId = params.pageId || '';

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
          setPage(response.data.draft);
          data.set(response.data.draft);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!data.get()) {
      fetchPage();
    } else {
      setPage(data.get());
    }
  }, [params.pageId]);

  return { isLoading, page: data.get() || page, error };
};

export default usePage;
