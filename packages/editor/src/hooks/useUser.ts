import auth from '@src/api/auth';
import { current } from '@src/common/current';
import { useCallback, useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState<any>(current.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    current.user = await auth.getUserProfile();
    setUser(current.user);
    setIsLoading(false);
  }, []);

  const handleSignOut = () => {
    current.user = null;
    auth.signOut();
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return { isLoading, user, fetchUser, signOut: handleSignOut };
};

export default useUser;
