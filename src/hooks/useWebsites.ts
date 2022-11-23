import { useState } from 'react';

const useWebsites = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [websites, setWebsites] = useState<any>(null);
  const [error, setError] = useState<any>(null);
};

export default useWebsites;
