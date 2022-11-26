import { useEffect, useState } from 'react';
import data from '@src/data';
import pages from '@src/api/pages';
import { useParams } from 'react-router-dom';
import { current } from '@src/common/current';
import websites from '@src/api/websites';

const usePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const params = useParams<{ websiteId: string; pageId: string }>();

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      try {
        current.website = await websites.getById(params.websiteId || '');
        let page;
        if (!params.pageId) {
          page = await pages.getDefaultByWebsiteId(params.websiteId || '');
        } else {
          page = (await pages.getById(params.pageId || '')) as any;
        }

        current.page = page;
        data.set(page.draft);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [params.pageId, params.websiteId]);

  return { isLoading, page: data.get(), error };
};

export default usePage;
