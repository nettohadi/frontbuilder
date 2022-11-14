import * as S from './styles';
import { FaDesktop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import { useEditor } from '@src/hooks/useEditor';
import { current } from '@src/common/current';
import { ScreenWidthType } from '@src/types';
import { MEASUREMENT } from '@src/global/variables';

const ScreenWidthPicker = () => {
  const { DESKTOP_SCREEN, MOBILE_SCREEN, TABLET_SCREEN } = MEASUREMENT;
  const renderEditor = useEditor();

  const handleSelect = (screenWidth: ScreenWidthType = '100%') => {
    current.screenWidth = screenWidth;
    renderEditor();
  };
  return (
    <>
      <S.DeviceScreens
        selected={current.screenWidth === DESKTOP_SCREEN}
        onClick={() => handleSelect(DESKTOP_SCREEN)}
      >
        <FaDesktop />
      </S.DeviceScreens>
      <S.DeviceScreens
        selected={current.screenWidth === TABLET_SCREEN}
        onClick={() => handleSelect(TABLET_SCREEN)}
      >
        <FaTabletAlt />
      </S.DeviceScreens>
      <S.DeviceScreens
        selected={current.screenWidth === MOBILE_SCREEN}
        onClick={() => handleSelect(MOBILE_SCREEN)}
      >
        <FaMobileAlt />
      </S.DeviceScreens>
      <S.ScreenSize>W: 1452 PX</S.ScreenSize>
    </>
  );
};

export default ScreenWidthPicker;
