import { ElementType, ParentType } from '@src/types';

let node: any = null;
let parent: ParentType = null;
let targetParent: ParentType = null;
let element: ElementType | null = null;
let targetElement: ElementType | null = null;
let rerender: any = null;
let highlightPadding = false;
let highlightMargin = false;
let editAble = false;
let isResizingWidth = false;
let isResizingHeight = false;

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
  setHighlightPadding: (_highlightPadding: boolean) => {
    highlightPadding = _highlightPadding;
  },
  getHighlightPadding: () => highlightPadding,
  setHighlightMargin: (_highlightMargin: boolean) => {
    highlightMargin = _highlightMargin;
  },
  getHighlightMargin: () => highlightMargin,
  // get set editable
  setIsEditingTextContent: (_editAble: boolean) => {
    editAble = _editAble;
  },
  isEditingTextContent: () => editAble,
  setIsResizing: ({ width, height }: { width: boolean; height: boolean }) => {
    isResizingWidth = width;
    isResizingHeight = height;
  },
  isResizing: () => ({ width: isResizingWidth, height: isResizingHeight }),
};
