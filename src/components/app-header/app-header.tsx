import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/user/user';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserSelector);
  const name = userData ? userData.name : '';
  //const email = userData ? userData.email : '';
  //const userProfile = `${name} (${email})`;
  return <AppHeaderUI userName={name} />;
};
