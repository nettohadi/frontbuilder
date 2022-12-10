import ColorControl from '@src/components/PropsEditor/controls/ColorControl';
import SizeControl from '@src/components/PropsEditor/controls/SizeControl';
import TextControl from '@src/components/PropsEditor/controls/TextControl';
import { ControlComponentType } from '@src/types';
import JustifyControl from '@src/components/PropsEditor/controls/JustifyControl/JustifyControl';
import AlignControl from '@src/components/PropsEditor/controls/AlignControl/AlignControl';
import FlexDirectionControl from '@src/components/PropsEditor/controls/FlexDirectionControl';
import SpacingControl from '@src/components/PropsEditor/controls/SpacingControl';
import TextContentControl from '@src/components/PropsEditor/controls/TextContentControl';

const propsToControls: {
  [key: string]: { label: string; control: ControlComponentType };
} = {
  flexDirection: { label: 'Direction', control: FlexDirectionControl },
  justifyContent: { label: 'Justify', control: JustifyControl },
  alignItems: { label: 'Align', control: AlignControl },
  backgroundColor: { label: 'Color', control: ColorControl },
  color: { label: 'Color', control: ColorControl },
  height: { label: 'Height', control: SizeControl },
  width: { label: 'Width', control: SizeControl },
  padding: { label: 'Padding', control: SpacingControl },
  borderRadius: { label: 'Corner', control: SizeControl },
  margin: { label: 'Margin', control: SpacingControl },
  fontWeight: { label: 'Weight', control: TextControl },
  fontSize: { label: 'Size', control: SizeControl },
  textContent: { label: 'Text', control: TextContentControl },
  name: { label: 'Text', control: TextControl },
};

const getControlForProp = (prop: string) => {
  return propsToControls[prop] || { label: prop, control: null };
};

export default getControlForProp;
