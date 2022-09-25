import ColorControl from '@components/PropsEditor/controls/ColorControl';
import SizeControl from '@components/PropsEditor/controls/SizeControl';
import TextControl from '@components/PropsEditor/controls/TextControl';
import { ControlComponentType } from '@src/types';
import HorizontalAlignmentControl from '@components/PropsEditor/controls/HorizontalAlignmentControl';
import VerticalAlignmentControl from '@components/PropsEditor/controls/VerticalAlignmentControl';

const propsToControls: {
  [key: string]: { label: string; control: ControlComponentType };
} = {
  justifyContent: { label: 'Justify', control: HorizontalAlignmentControl },
  alignItems: { label: 'Align', control: VerticalAlignmentControl },
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
  return propsToControls[prop] || { label: prop, control: null };
};

export default getControlForProp;
