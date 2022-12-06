import React, { useEffect, useMemo, useState } from 'react';

import FloatingMenu from '@components/FloatingMenu';
import * as G from '@src/styles';
import * as S from './styles';
import useUser from '@src/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { generateInitialsFromName } from '@src/utils/helperFunctions';

const User = () => {
  const [userIsVisible, showUser] = useState(false);
  const { user, signOut } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signIn');
  };

  useEffect(() => {
    console.log('mount User');
  }, []);

  return (
    <FloatingMenu
      content={<UserProfile user={user} signOut={handleSignOut} />}
      visible={userIsVisible}
      onClickOutside={() => showUser(false)}
      showArrow={false}
      placement={'right-start'}
    >
      <div>
        <Avatar
          fullName={user?.full_name}
          url={user?.avatar_url}
          onClick={() => showUser((s) => !s)}
        />
      </div>
    </FloatingMenu>
  );
};

export default User;

const UserProfile = ({ user, signOut }: any) => {
  return (
    <>
      <S.Container>
        <Avatar fullName={user?.full_name} url={user?.avatar_url} size={40} />
        <S.Label>{user?.full_name}</S.Label>
        <S.SubLabel>{user?.email}</S.SubLabel>
      </S.Container>
      <G.Divider />
      <div>
        <S.MenuItem>Update Profile</S.MenuItem>
        <S.MenuItem>Update Password</S.MenuItem>
        <S.MenuItem onClick={signOut}>
          <MdLogout size={15} />
          Sign Out
        </S.MenuItem>
      </div>
      <G.Divider />
    </>
  );
};

const Avatar = ({
  fullName,
  url,
  size,
  onClick,
}: {
  fullName: string;
  url: string;
  size?: number;
  onClick?: () => void;
}) => {
  const initial = useMemo(() => {
    return generateInitialsFromName(fullName);
  }, [fullName]);

  return (
    <S.AvatarImage url={url} size={size} onClick={onClick}>
      {!url && initial}
    </S.AvatarImage>
  );
};
