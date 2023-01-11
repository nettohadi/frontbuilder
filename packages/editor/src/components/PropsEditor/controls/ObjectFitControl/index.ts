import FloatingDropDownControlFactory from '@components/PropsEditor/controls/base/FloatingDropDownControl';

const ObjectFitControl = () => {
  return FloatingDropDownControlFactory(
    [
      { value: 'cover', label: 'Stretch to fill' },
      { value: 'contain', label: 'Fit inside' },
      { value: 'fill', label: 'Fill' },
      { value: 'none', label: 'Original' },
    ],
    '120px'
  );
};

export default ObjectFitControl;
