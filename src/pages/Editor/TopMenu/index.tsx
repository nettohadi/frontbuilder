import * as S from './styles';
import {
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaEye,
  FaRocket,
  FaUndoAlt,
  FaRedoAlt,
} from 'react-icons/fa';
import useHistory from '@src/hooks/useHistory';
import Tooltip from '@components/Tooltip';
import useMapHotkeys from '@src/pages/Editor/TopMenu/useMapHotkeys';

const TopMenu = () => {
  useMapHotkeys();
  const history = useHistory();

  return (
    <S.MenuContainer>
      <S.HomeCol>
        <S.HomeButton>F</S.HomeButton>
        <S.PageTitle>Page: Home</S.PageTitle>
      </S.HomeCol>
      <S.DevicesCol>
        <S.DeviceScreens selected={true}>
          <FaDesktop />
        </S.DeviceScreens>
        <S.DeviceScreens>
          <FaTabletAlt />
        </S.DeviceScreens>
        <S.DeviceScreens>
          <FaMobileAlt />
        </S.DeviceScreens>
        <S.ScreenSize>W: 1452 PX</S.ScreenSize>
      </S.DevicesCol>
      <S.PublishCol>
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
        <S.PreviewButton>
          <FaEye />
          Preview
        </S.PreviewButton>
        <S.PublishButton>
          <FaRocket />
          Publish
        </S.PublishButton>
      </S.PublishCol>
    </S.MenuContainer>
  );
};

export default TopMenu;
