import React, { useEffect } from 'react';
import auth from '@src/api/auth';
import { useNavigate } from 'react-router-dom';
import { current } from '@src/common/current';

const withAuth = (Component: any) => {
  const WrappedComponent = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        const session = await auth.getSession();
        if (session) {
          current.user = session.user;
        } else {
          navigate('/signIn');
        }
      };

      checkAuth();
    }, [navigate]);

    return <Component {...props} />;
  };
  return WrappedComponent;
};

export default withAuth;
