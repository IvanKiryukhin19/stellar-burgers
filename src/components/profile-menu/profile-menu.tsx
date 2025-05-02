import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logout } from '../../services/thunk/user/logout';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('exit-logout');
    dispatch(logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
