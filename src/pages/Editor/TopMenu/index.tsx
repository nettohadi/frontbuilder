import * as S from './styles';
import {
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaEye,
  FaRocket,
} from 'react-icons/fa';
import UndoRedo from '@src/pages/Editor/TopMenu/UndoRedo';

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
        <UndoRedo />
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
