import Tooltip from '@components/Tooltip';
import * as S from './styles';
import { FaRedoAlt, FaUndoAlt } from 'react-icons/fa';
import useHistory from '@src/hooks/useHistory';
import { useHotkeys } from 'react-hotkeys-hook';

const UndoRedo = () => {
  const history = useHistory();

  // map hotkeys
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
    if (history.canRedo) history.redo();
  });

  return (
    <>
      <Tooltip content={!history.canUndo ? 'Nothing to undo' : 'Undo'}>
        <S.UndoRedo off={!history.canUndo} onClick={history.undo}>
          <FaUndoAlt />
        </S.UndoRedo>
      </Tooltip>
      <Tooltip content={!history.canRedo ? 'Nothing to redo' : 'Redo'}>
        <S.UndoRedo off={!history.canRedo} onClick={history.redo}>
          <FaRedoAlt />
        </S.UndoRedo>
      </Tooltip>
    </>
  );
};

export default UndoRedo;
