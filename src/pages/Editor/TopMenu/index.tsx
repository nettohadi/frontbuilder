import * as S from './styles';
import {
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaEye,
  FaRocket,
} from 'react-icons/fa';
import UndoRedo from '@src/pages/Editor/TopMenu/UndoRedo';
import { useContext, useState } from 'react';
import PageData from '@src/context';
import { current } from '@src/common/current';
import { MEASUREMENT } from '@src/global/StyleVariables';

const deviceWidth = {
  desktop: MEASUREMENT.CANVAS_WIDTH(),
  tablet: '768px',
  phone: '375px',
};

const TopMenu = () => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'phone'>(
    'desktop'
  );
  const renderEditor = useContext(PageData);

  const handleSelectDevice = (device: 'desktop' | 'tablet' | 'phone') => {
    current.deviceWidth = deviceWidth[device];
    setDevice(device);
    renderEditor();
  };
  return (
    <S.MenuContainer>
      <S.HomeCol>
        <S.HomeButton>F</S.HomeButton>
        <S.PageTitle>Page: Home</S.PageTitle>
      </S.HomeCol>
      <S.DevicesCol>
        <S.DeviceScreens
          selected={device === 'desktop'}
          onClick={() => handleSelectDevice('desktop')}
        >
          <FaDesktop />
        </S.DeviceScreens>
        <S.DeviceScreens
          selected={device === 'tablet'}
          onClick={() => handleSelectDevice('tablet')}
        >
          <FaTabletAlt />
        </S.DeviceScreens>
        <S.DeviceScreens
          selected={device === 'phone'}
          onClick={() => handleSelectDevice('phone')}
        >
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
