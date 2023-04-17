import FloatingDropDownControlFactory from '@components/PropsEditor/controls/base/FloatingDropDownControl';

const YesNoControl = () => {
  return FloatingDropDownControlFactory(
    [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    '120px'
  );
};

export default YesNoControl;
