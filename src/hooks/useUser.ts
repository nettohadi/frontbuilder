import auth from '@src/api/auth';
import { current } from '@src/common/current';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState<any>(current.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    setIsLoading(true);
    current.user = await auth.getUserProfile();
    setUser(current.user);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return { isLoading, user, fetchUser, signOut: auth.signOut };
};

export default useUser;
