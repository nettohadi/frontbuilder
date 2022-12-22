import { useMutation, useQueryClient } from '@tanstack/react-query';
import pages from '@src/api/pages';
import { PageType } from '@src/types';

const usePageMutation = () => {
  const queryClient = useQueryClient();
  const create = useMutation({
    mutationFn: (data: PageType) => {
      const { id, ...others } = data;
      return pages.create(others);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });

  const update = useMutation({
    mutationFn: (data: PageType) => {
      return pages.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });

  const setAsDefault = useMutation({
    mutationFn: (pageId: string) => {
      return pages.setAsDefault(pageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });

  const deleteById = useMutation({
    mutationFn: (pageId: string) => {
      return pages.deleteById(pageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });

  return { create, update, setAsDefault, deleteById };
};

export default usePageMutation;
