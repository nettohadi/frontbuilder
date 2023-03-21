import auth from '@src/api/auth';
import { current } from '@src/common/current';
import { useCallback, useEffect, useState } from 'react';
import { UserType } from '@src/types';

const useUser = () => {
  const [user, setUser] = useState<UserType>(current.user);
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
