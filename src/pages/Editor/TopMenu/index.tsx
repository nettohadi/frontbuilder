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

const TopMenu = () => {
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
        <S.UndoRedo>
          <FaUndoAlt />
        </S.UndoRedo>
        <S.UndoRedo>
          <FaRedoAlt />
        </S.UndoRedo>
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
