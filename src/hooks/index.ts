import { useCallback, useState } from 'react';

export const useRender = () => {
  const [, setUpdate] = useState(false);
  const render = useCallback(() => setUpdate((prev) => !prev), []);
  return render;
};
