import { useContext, useState } from 'react';
import history from '@src/global/history';
import PageData from '@src/context';

type HistoryType = {
  undo: () => void;
  redo: () => void;
  currentIndex: number;
  canUndo: any;
  canRedo: any;
};
const useHistory = (): HistoryType => {
  const [currentIndex, setCurrentIndex] = useState(history.currentIndex);
  const renderEditor = useContext(PageData);

  return {
    undo: () => {
      history.undo();
      setCurrentIndex(history.currentIndex);
      renderEditor();
    },
    redo: () => {
      history.redo();
      setCurrentIndex(history.currentIndex);
      renderEditor();
    },
    currentIndex,
    get canUndo() {
      return history.currentIndex !== 0;
    },
    get canRedo() {
      return history.currentIndex !== history.count - 1 && history.count > 0;
    },
  };
};

export default useHistory;
