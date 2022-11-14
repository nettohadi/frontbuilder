import { useContext } from 'react';
import PageData from '@src/context';

export const useEditor = () => {
  return useContext(PageData);
};
