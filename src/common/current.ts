import { ElementType } from '@src/types';

let node: any = null;
let parent: ElementType | null = null;
let element: ElementType | null = null;
let rerender: any = null;

export const current = {
  getElement: () => element,
  setElement: (_element: ElementType | null) => {
    element = _element;
  },
  getParent: () => parent,
  setParent: (_parent: ElementType | null) => {
    parent = _parent;
  },
  getNode: () => node,
  setNode: (_node: HTMLElement | null) => {
    node = _node;
  },
  setRerender: (_rerender: any) => {
    rerender = _rerender;
  },
  getRerender: () => rerender,
};
