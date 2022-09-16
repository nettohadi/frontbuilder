import Box, { BoxElement } from '@components/Elements/Box';
import Button, { ButtonElement } from '@components/Elements/Button';
import withEditHandler from '@src/pages/Editor/withEditHandler';

const customComponents: any = {};
export function registerCustomComponent(
  name: string,
  component: any,
  elementData: any = {}
) {
  customComponents[name] = {
    component: withEditHandler(component),
    data: elementData,
  };
}

export function getCustomComponent(name: string) {
  return customComponents[name];
}

export function getAllCustomComponents() {
  return customComponents;
}

registerCustomComponent('Box', Box, BoxElement);
registerCustomComponent('Button', Button, ButtonElement);
