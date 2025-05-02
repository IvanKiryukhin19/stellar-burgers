import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { getUser } from '../../services/thunk/user/getUser';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { getUserSelector } from '../../services/slices/user/user';
import { getCookie } from '../../utils/cookie';
import { updateUser } from '../../services/thunk/user/updateUser';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const userData = useSelector(getUserSelector);

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }, []);

  const user = userData ? userData : { name: '', email: '' };

  //const user = {
  //  name: '',
  //  email: ''
  //};

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]); //[user] - я убрал

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
