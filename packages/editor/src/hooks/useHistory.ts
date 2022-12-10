import history from '@src/global/history';
import { useRender } from '@src/hooks/index';
import { useEditor } from '@src/hooks/useEditor';

type HistoryType = {
  undo: () => void;
  redo: () => void;
  currentIndex: number;
  canUndo: any;
  canRedo: any;
};
const useHistory = (): HistoryType => {
  const rerender = useRender();
  const renderEditor = useEditor();
  history.subscribe(rerender);

  return {
    undo: () => {
      history.undo();
      renderEditor();
    },
    redo: () => {
      history.redo();
      renderEditor();
    },
    get currentIndex() {
      return history.currentIndex;
    },
    get canUndo() {
      return history.currentIndex !== 0;
    },
    get canRedo() {
      return history.currentIndex !== history.count - 1 && history.count > 0;
    },
  };
};

export default useHistory;
