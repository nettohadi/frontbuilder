import { useQuery } from '@tanstack/react-query';
import pages from '@src/api/pages';

const usePages = () => {
  return useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      return pages.getAll();
    },
  });
};

export default usePages;
