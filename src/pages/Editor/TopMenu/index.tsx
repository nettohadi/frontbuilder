import * as S from './styles';
import { FaEye, FaRocket } from 'react-icons/fa';
import { RiArrowDownSLine } from 'react-icons/ri';
import { FaGlobe } from 'react-icons/fa';
import UndoRedo from '@src/pages/Editor/TopMenu/UndoRedo';
import ScreenWidthPicker from '@src/pages/Editor/TopMenu/ScreenWidthPicker';
import auth from '@src/api/auth';
import ClickAble from '@components/ClickAble';
import { MdDashboard } from 'react-icons/md';
import SiteMenu from '@src/pages/Editor/TopMenu/SiteMenu';

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
