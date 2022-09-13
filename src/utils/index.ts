import Box from '@components/Elements/Box';
import Button from '@components/Elements/Button';
import withEditHandler from '@src/pages/Editor/withEditHandler';

const customComponents: any = {};
export function registerCustomComponent(name: string, component: any) {
  customComponents[name] = withEditHandler(component);
}

export function getCustomComponent(name: string) {
  return customComponents[name];
}

registerCustomComponent('Box', Box);
registerCustomComponent('Button', Button);
