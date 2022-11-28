import { useMutation, useQueryClient } from '@tanstack/react-query';
import websites from '@src/api/websites';
import { WebsiteType } from '@src/types';

const useWebsiteMutation = () => {
  const queryClient = useQueryClient();
  const create = useMutation({
    mutationFn: (data: WebsiteType) => {
      const { id, ...others } = data;
      return websites.create(others);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
    },
  });

  const update = useMutation({
    mutationFn: (data: WebsiteType) => {
      return websites.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
    },
  });

  return { create, update };
};

export default useWebsiteMutation;
