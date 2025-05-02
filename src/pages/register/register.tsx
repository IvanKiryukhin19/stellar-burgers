import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser } from '../../services/thunk/user/registerUser';
import { useDispatch, useSelector } from '../../services/store';
import { getUserErrorSelector } from '../../services/slices/user/user';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const message = useSelector(getUserErrorSelector);

  const data = {
    name: userName,
    email: email,
    password: password
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  return (
    <RegisterUI
      errorText={message ?? ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
