import { useQuery } from '@tanstack/react-query';
import websites from '@src/api/websites';

const useWebsites = () => {
  return useQuery({
    queryKey: ['websites'],
    queryFn: async () => {
      return websites.getAll();
    },
  });
};

export default useWebsites;
