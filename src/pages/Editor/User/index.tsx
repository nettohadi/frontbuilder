import { FaUserCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import FloatingMenu from '@components/FloatingMenu';
import styled from 'styled-components';
import * as G from '@src/styles';
import { COLORS } from '@src/global/variables';
import useUser from '@src/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';

const User = () => {
  const [userIsVisible, showUser] = useState(false);
  const { user, signOut, fetchUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signIn');
  };

  const UserAvatar = () => {
    if (user?.avatar_url) {
      return (
        <Avatar url={user?.avatar_url} onClick={() => showUser((s) => !s)} />
      );
    }

    return (
      <FaUserCircle
        size={23}
        onClick={() => showUser((s) => !s)}
        cursor={'pointer'}
      />
    );
  };

  return (
    <FloatingMenu
      content={<UserProfile user={user} signOut={handleSignOut} />}
      visible={userIsVisible}
      onClickOutside={() => showUser(false)}
      showArrow={false}
      placement={'right-start'}
    >
      <div>
        <UserAvatar />
      </div>
    </FloatingMenu>
  );
};

export default User;

const UserProfile = ({ user, signOut }: any) => {
  return (
    <>
      <Container>
        {!user?.avatar_url && <FaUserCircle size={40} />}
        {user?.avatar_url && <Avatar url={user?.avatar_url} size={40} />}
        <Label>{user?.full_name}</Label>
        <SubLabel>{user?.email}</SubLabel>
      </Container>
      <G.Divider />
      <div>
        <MenuItem>Update Profile</MenuItem>
        <MenuItem>Update Password</MenuItem>
        <MenuItem onClick={signOut}>
          <MdLogout size={15} />
          Sign Out
        </MenuItem>
      </div>
      <G.Divider />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  width: 230px;
  gap: 10px 3px;
  color: whitesmoke;
`;

const MenuItem = styled.div`
  color: #d0cccc;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 13px;
  padding: 6px 7px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-start;

  &:hover {
    background-color: ${COLORS.MENU_HOVER};
  }
`;

const Label = styled.div`
  font-size: 16px;
`;

const SubLabel = styled.div`
  font-size: 11px;
  color: #d0cccc;
`;

const Avatar = styled.div<{ url: string; size?: number }>`
  background-image: url('${(props) => {
    return props.url.trim();
  }}');
  background-size: cover;
  width: ${(props) => props.size || 23}px;
  height: ${(props) => props.size || 23}px;
  border-radius: 50%;
  background-color: #d0cccc;
  cursor: pointer;
`;
