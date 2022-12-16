import * as S from './styles';
import UndoRedo from '@src/pages/Editor/TopMenu/UndoRedo';
import ScreenWidthPicker from '@src/pages/Editor/TopMenu/ScreenWidthPicker';
import SiteMenu from '@src/pages/Editor/TopMenu/SiteMenu';
import Publish from '@src/pages/Editor/TopMenu/Publish';

const TopMenu = () => {
  return (
    <S.MenuContainer>
      <S.HomeCol>
        <SiteMenu />
      </S.HomeCol>
      <S.DevicesCol>
        <ScreenWidthPicker />
      </S.DevicesCol>
      <S.PublishCol>
        <UndoRedo />
        <Publish />
      </S.PublishCol>
    </S.MenuContainer>
  );
};

export default TopMenu;
