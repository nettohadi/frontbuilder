import { useQuery } from '@tanstack/react-query';
import storage from '@src/api/storage';
import { current } from '@src/common/current';

const useStorage = (bucket: string) => {
  return useQuery({
    queryKey: [bucket],
    queryFn: () => {
      return storage.list(bucket, 'dc4a71d5-e7fa-406c-9c59-5b850c53f959');
    },
  });
};

export default useStorage;
