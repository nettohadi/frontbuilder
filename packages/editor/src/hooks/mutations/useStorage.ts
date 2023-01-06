import { useMutation, useQueryClient } from '@tanstack/react-query';
import storage from '@src/api/storage';
import { current } from '@src/common/current';
import { sanitizeForUrl } from '@src/utils/helperFunctions';

const useStorage = (bucket: string) => {
  const queryClient = useQueryClient();
  const upload = useMutation({
    mutationFn: (option: { imageName: string; image: any }) => {
      const sanitizedImageName = sanitizeForUrl(option.imageName);
      return storage.upload(
        bucket,
        `${current.user.id}/${current.website.id}/${sanitizedImageName}`,
        option.image
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [bucket] });
    },
  });

  const remove = useMutation({
    mutationFn: (option: { imageName: string }) => {
      return storage.remove(
        bucket,
        `${current.user.id}/${current.website.id}/${option.imageName}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [bucket] });
    },
  });

  return { upload, remove: remove };
};
export default useStorage;
