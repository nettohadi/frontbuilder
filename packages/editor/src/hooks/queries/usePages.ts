import { useQuery } from '@tanstack/react-query';
import pages from '@src/api/pages';

const usePages = (websiteId: number) => {
  return useQuery({
    queryKey: ['pages', websiteId],
    queryFn: async () => {
      return pages.getAll(websiteId);
    },
  });
};

export default usePages;
