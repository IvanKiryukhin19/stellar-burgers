const email = 'ivkusto@yandex.ru';
const newEmail = email;
const name = 'Жак-Ив Кусто';
const newName = 'Жак-Без Кусто';
const accessToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGZkMGY0ZThlNjFkMDAxY2VjNTAwYiIsImlhdCI6MTc0NTg2Njk5NiwiZXhwIjoxNzQ1ODY4MTk2fQ.zDxcf6bJzw3RsfG5-cA0fywTjK-hC6JZbOgHmWnAmJo';
const refreshToken =
  '79a44507c4668e0d26c14f3b37c0fc8168a09fea6c997abd63e90bef6d62a9eb99a485dff87a9177';
const password = '111';
const newPassword = '222';

export const initialStateWithUserData = {
  success: false,
  isAuthChecked: false,
  user: {
    email: email,
    name: name
  },
  loading: false,
  error: ''
};

export const userDataResponse = {
  success: true,
  user: {
    email: email,
    name: name
  },
  accessToken: accessToken,
  refreshToken: refreshToken
};

export const userRegisterDataResponse = {
  accessToken: accessToken,
  refreshToken: refreshToken,
  user: {
    email: email,
    name: name
  },
  success: true
};

export const userRegisterData = {
  email: email,
  name: name,
  password: password
};

export const userLoginData = {
  email: email,
  password: password
};

export const userDataAfterUpdate = {
  success: true,
  user: {
    email: email,
    name: newName
  }
};

export const userDataForUpdate = {
  email: newEmail,
  name: newName,
  password: newPassword
};
