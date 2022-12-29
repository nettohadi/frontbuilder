import { useMutation, useQueryClient } from '@tanstack/react-query';
import storage from '@src/api/storage';
import { current } from '@src/common/current';

const useStorage = (bucket: string) => {
  const queryClient = useQueryClient();
  const upload = useMutation({
    mutationFn: (option: { imageName: string; image: any }) => {
      return storage.upload(
        bucket,
        `${current.user.id}/${option.imageName}`,
        option.image
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [bucket] });
    },
  });

  const remove = useMutation({
    mutationFn: (option: { imageName: string }) => {
      return storage.remove(bucket, `${current.user.id}/${option.imageName}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [bucket] });
    },
  });

  return { upload, remove: remove };
};
export default useStorage;
