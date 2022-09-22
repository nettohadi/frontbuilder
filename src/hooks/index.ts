import { useState } from 'react';

export const useRender = () => {
  const [, setUpdate] = useState(false);
  return () => setUpdate((prev) => !prev);
};
