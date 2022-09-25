import ColorControl from '@components/PropsEditor/controls/ColorControl';
import SizeControl from '@components/PropsEditor/controls/SizeControl';
import TextControl from '@components/PropsEditor/controls/TextControl';
import { ControlComponentType } from '@src/types';

const propsToControls: {
  [key: string]: { label: string; control: ControlComponentType };
} = {
  display: { label: 'Display', control: TextControl },
  justifyContent: { label: 'Justify', control: TextControl },
  alignItems: { label: 'Align', control: TextControl },
  flexDirection: { label: 'direction', control: TextControl },
  backgroundColor: { label: 'color', control: ColorControl },
  color: { label: 'color', control: ColorControl },
  height: { label: 'height', control: SizeControl },
  width: { label: 'width', control: SizeControl },
  padding: { label: 'padding', control: SizeControl },
  borderRadius: { label: 'corner', control: SizeControl },
  margin: { label: 'margin', control: SizeControl },
  fontWeight: { label: 'weight', control: TextControl },
};

const getControlForProp = (prop: string) => {
  return propsToControls[prop] || { label: prop, control: TextControl };
};

export default getControlForProp;
