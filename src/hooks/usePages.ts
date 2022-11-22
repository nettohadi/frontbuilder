import { useState } from 'react';

const usePages = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<any>(null);
  const [error, setError] = useState<any>(null);
};

export default usePages;
