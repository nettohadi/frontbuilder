import pageDraft from '@src/global/pageDraft';
import { useEffect } from 'react';
import { useRender } from '@src/hooks/index';

const usePageDraft = () => {
  const render = useRender();
  useEffect(() => {
    pageDraft.subscribe(render);
    return () => {
      pageDraft.unsubscribe(render);
    };
  }, [render]);

  return {
    isLoading: pageDraft.isLoading,
    isError: pageDraft.isError,
  };
};

export default usePageDraft;
