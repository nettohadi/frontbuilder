import * as S from './styles';
import UndoRedo from '@src/pages/Editor/TopMenu/UndoRedo';
import ScreenWidthPicker from '@src/pages/Editor/TopMenu/ScreenWidthPicker';
import SiteMenu from '@src/pages/Editor/TopMenu/SiteMenu';
import Publish from '@src/pages/Editor/TopMenu/Publish';
import XrayMode from '@src/pages/Editor/TopMenu/XrayMode';
import SavingStatus from '@src/pages/Editor/TopMenu/SavingStatus';

const TopMenu = () => {
  return (
    <S.MenuContainer>
      <S.HomeCol>
        <SiteMenu />
      </S.HomeCol>
      <S.DevicesCol>
        <ScreenWidthPicker />
        <XrayMode />
      </S.DevicesCol>
      <S.PublishCol>
        <SavingStatus />
        <UndoRedo />
        <Publish />
      </S.PublishCol>
    </S.MenuContainer>
  );
};

export default TopMenu;
