import FloatingDropDownControlFactory from '@components/PropsEditor/controls/base/FloatingDropDownControl';

const ImagePositionControl = () => {
  return FloatingDropDownControlFactory(
    [
      { value: 'top', label: 'Top' },
      { value: 'top left', label: 'Top-Left' },
      { value: 'top right', label: 'Top-Right' },
      { value: 'bottom', label: 'Bottom' },
      { value: 'bottom left', label: 'Bottom-Left' },
      { value: 'bottom right', label: 'Bottom-Right' },
      { value: 'center', label: 'Center' },
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' },
    ],
    '120px'
  );
};

export default ImagePositionControl;
