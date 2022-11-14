import * as S from './styles';
import { FaEye, FaRocket } from 'react-icons/fa';
import UndoRedo from '@src/pages/Editor/TopMenu/UndoRedo';
import ScreenWidthPicker from '@src/pages/Editor/TopMenu/ScreenWidthPicker';

const TopMenu = () => {
  return (
    <S.MenuContainer>
      <S.HomeCol>
        <S.HomeButton>F</S.HomeButton>
        <S.PageTitle>Page: Home</S.PageTitle>
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
