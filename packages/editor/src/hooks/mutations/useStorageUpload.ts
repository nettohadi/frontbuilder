import { useMutation, useQueryClient } from '@tanstack/react-query';
import storage from '@src/api/storage';
import { current } from '@src/common/current';

const useStorageUpload = (bucket: string) => {
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

  return { upload };
};
export default useStorageUpload;
