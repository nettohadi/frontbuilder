import { useQuery } from '@tanstack/react-query';
import storage from '@src/api/storage';
import { current } from '@src/common/current';

const useStorage = (bucket: string) => {
  return useQuery({
    queryKey: [bucket],
    queryFn: () => {
      return storage.list(bucket, current.user.id);
    },
  });
};

export default useStorage;
