import useHistory from '@src/hooks/useHistory';
import { useHotkeys } from 'react-hotkeys-hook';

const useMapHotkeys = () => {
  const history = useHistory();

  useHotkeys('cmd+z', (e: KeyboardEvent) => {
    e.preventDefault();
    if (history.canUndo) history.undo();
  });
  useHotkeys('ctrl+z', (e: KeyboardEvent) => {
    e.preventDefault();
    if (history.canUndo) history.undo();
  });
  useHotkeys('cmd+y', (e: KeyboardEvent) => {
    e.preventDefault();
    if (history.canRedo) history.redo();
  });
  useHotkeys('ctrl+y', (e: KeyboardEvent) => {
    e.preventDefault();
    if (history.canRedo) history.undo();
  });
};

export default useMapHotkeys;
