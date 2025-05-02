import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getUserErrorSelector } from '../../services/slices/user/user';
import { loginUser } from '../../services/thunk/user/loginUser';
import { getOrders } from '../../services/thunk/order/orders';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector(getUserErrorSelector);

  const data = {
    email: email,
    password: password
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(data));
    //dispatch(getOrders());
    if (!message) navigate(-1);
  };

  return (
    <LoginUI
      errorText={message ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
