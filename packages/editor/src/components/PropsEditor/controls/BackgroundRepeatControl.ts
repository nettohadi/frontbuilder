import DropDownControlFactory from '@components/PropsEditor/controls/DropDownControl';

const BackgroundSizeControl = () => {
  return DropDownControlFactory([
    { value: 'repeat', label: 'Repeat' },
    { value: 'repeat-x', label: 'Repeat horizontally' },
    { value: 'repeat-y', label: 'Repeat vertically' },
    { value: 'no-repeat', label: "Don't repeat" },
  ]);
};

export default BackgroundSizeControl;
