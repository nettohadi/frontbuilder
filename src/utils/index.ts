import Box from '@components/Elements/Box';
import Button from '@components/Elements/Button';
import WithEditHandler from '@src/pages/Editor/WithEditHandler';

const customComponents: any = {};
export function registerCustomComponent(name: string, component: any) {
  customComponents[name] = WithEditHandler(component);
}

export function getCustomComponent(name: string) {
  return customComponents[name];
}

registerCustomComponent('Box', Box);
registerCustomComponent('Button', Button);
