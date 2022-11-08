//@ts-ignore
export const Current = () => window.top.canvasFrame?.currentData as any;
//@ts-ignore
export const UpdateElementProp = () =>
  //@ts-ignore
  window.top.canvasFrame.updateElementProp as any;
//@ts-ignore
export const Data = () => window.top.canvasFrame?.data as any;
