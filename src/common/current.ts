import { ElementType, ParentType } from '@src/types';

let node: any = null;
let parent: ParentType = null;
let targetParent: ParentType = null;
let element: ElementType | null = null;
let targetElement: ElementType | null = null;
let rerender: any = null;

export const current = {
  getElement: () => element,
  setElement: (_element: ElementType | null) => {
    element = _element;
  },
  getTargetElement: () => targetElement,
  setTargetElement: (_targetElement: ElementType | null) => {
    targetElement = _targetElement;
  },
  getParent: () => parent,
  setParent: (_parent: ParentType) => {
    parent = _parent;
  },
  getTargetParent: () => targetParent,
  setTargetParent: (_targetParent: ParentType) => {
    targetParent = _targetParent;
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
