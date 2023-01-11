import FloatingDropDownControlFactory from '@components/PropsEditor/controls/base/FloatingDropDownControl';
import styled from 'styled-components';

const FontFamilyControl = () => {
  return FloatingDropDownControlFactory(
    [
      {
        value: 'helvetica',
        label: <Font fontFamily={'helvetica'}>Helvetica</Font>,
      },
      { value: 'arial', label: <Font fontFamily={'arial'}>Arial</Font> },
      {
        value: 'arial black',
        label: <Font fontFamily={'arial black'}>Arial Black</Font>,
      },
      {
        value: 'verdana',
        label: <Font fontFamily={'verdana'}>Verdana</Font>,
      },
      {
        value: 'tahoma',
        label: <Font fontFamily={'tahoma'}>Tahoma</Font>,
      },
      {
        value: 'Trebuchet MS',
        label: <Font fontFamily={'Trebuchet MS'}>Trebuchet MS</Font>,
      },
      {
        value: 'Impact',
        label: <Font fontFamily={'Impact'}>Impact</Font>,
      },
      {
        value: 'Gill Sans',
        label: <Font fontFamily={'Gill Sans'}>Gill Sans</Font>,
      },
      {
        value: 'Times New Roman',
        label: <Font fontFamily={'Times New Roman'}>Times New Roman</Font>,
      },
      {
        value: 'Georgia',
        label: <Font fontFamily={'Georgia'}>Georgia</Font>,
      },
      {
        value: 'Palatino',
        label: <Font fontFamily={'Palatino'}>Palatino</Font>,
      },
      {
        value: 'Baskerville',
        label: <Font fontFamily={'Baskerville'}>Baskerville</Font>,
      },
      {
        value: 'Courier',
        label: <Font fontFamily={'Courier'}>Courier</Font>,
      },
      {
        value: 'Lucida',
        label: <Font fontFamily={'Lucida'}>Lucida</Font>,
      },
      {
        value: 'Luminari',
        label: <Font fontFamily={'Luminari'}>Luminari</Font>,
      },
      {
        value: 'Comic Sans MS',
        label: <Font fontFamily={'Comic Sans MS'}>Comic Sans MS</Font>,
      },
    ],
    '150px'
  );
};

export default FontFamilyControl;

const Font = styled.div<{ fontFamily: string }>`
  font-family: ${(props) => props.fontFamily};
`;
