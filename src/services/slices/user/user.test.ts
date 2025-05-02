import userReducer, { initialState, userActions } from './user';
import {
  initialStateWithUserData,
  userDataResponse,
  userRegisterDataResponse,
  userRegisterData,
  userLoginData,
  userDataAfterUpdate,
  userDataForUpdate
} from '../../../testData/user';
import { getUser } from '../../thunk/user/getUser';
import { registerUser } from '../../thunk/user/registerUser';
import { loginUser } from '../../thunk/user/loginUser';
import { updateUser } from '../../thunk/user/updateUser';
import { logout } from '../../thunk/user/logout';

describe('тесты синхронных акшенов', () => {
  it('проверяем очистку данных пользователя (name и email)', () => {
    const newState = userReducer(
      initialStateWithUserData,
      userActions.clearUserData()
    );

    expect(newState.user).toBeNull();
  });
});

describe('тесты асинхронных экшенов', () => {
  it('тестируем успешное получение данных пользователя', async () => {
    const newState = userReducer(
      initialState,
      getUser.fulfilled(userDataResponse, 'fulfilled')
    );

    expect(newState.loading).toBeFalsy();
    expect(newState.success).toEqual(userDataResponse.success);
    expect(newState.isAuthChecked).toBeTruthy();
    expect(newState.user).toEqual(userDataResponse.user);
  });

  it('тестируем успешную регистрацию пользователя', async () => {
    const newState = userReducer(
      initialState,
      registerUser.fulfilled(
        userRegisterDataResponse,
        'fulfilled',
        userRegisterData
      )
    );

    expect(newState.loading).toBeFalsy();
    expect(newState.isAuthChecked).toBeTruthy();
    expect(newState.user?.name).toEqual(userDataResponse.user.name);
    expect(newState.user?.email).toEqual(userDataResponse.user.email);
  });

  it('тестируем вход пользователя', async () => {
    const newState = userReducer(
      initialState,
      loginUser.fulfilled(userDataResponse, 'fulfilled', userLoginData)
    );

    expect(newState.loading).toBeFalsy();
    expect(newState.isAuthChecked).toBeTruthy();
    expect(newState.user?.name).toEqual(userDataResponse.user.name);
    expect(newState.user?.email).toEqual(userDataResponse.user.email);
  });

  it('тестируем изменение данных пользователя', async () => {
    const newState = userReducer(
      initialStateWithUserData,
      updateUser.fulfilled(userDataAfterUpdate, 'fulfilled', userDataForUpdate)
    );

    expect(newState.loading).toBeFalsy();
    expect(newState.user?.name).toEqual(userDataAfterUpdate.user.name);
    expect(newState.user?.email).toEqual(userDataAfterUpdate.user.email);
  });

  it('тестируем выход из профиля', async () => {
    const newState = userReducer(
      initialStateWithUserData,
      logout.fulfilled('fulfilled', 'refreshToken')
    );

    expect(newState.user).toBeNull();
  });

  it('тестируем для всех thunk ожидание pending', async () => {
    const arrayThunks = [getUser, registerUser, loginUser, updateUser, logout];

    arrayThunks.forEach((thunk) => {
      const newState = userReducer(initialState, thunk.pending('pending'));

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
  });

  it('тестируем ошибку выполнения запроса', async () => {
    const error: Error = {
      name: 'rejected',
      message: 'Ошибка выполнения запроса'
    };

    const arrayThunks = [getUser, registerUser, loginUser, updateUser, logout];

    arrayThunks.forEach((thunk) => {
      const newSate = userReducer(
        initialState,
        thunk.rejected(error, 'rejected')
      );

      expect(newSate.error).toEqual(error.message);
      expect(newSate.isAuthChecked).toBeTruthy();
      expect(newSate.loading).toBeFalsy();
    });
  });

  it('тестируем ошибку выполнения запроса без сообщения об ошибке', async () => {
    const error: Error = {
      name: 'rejected',
      message: ''
    };

    const arrayThunks = [getUser, registerUser, loginUser, updateUser, logout];

    arrayThunks.forEach((thunk) => {
      const newSate = userReducer(
        initialState,
        thunk.rejected(error, 'rejected')
      );

      expect(newSate.error).toBeNull();
      expect(newSate.isAuthChecked).toBeTruthy();
      expect(newSate.loading).toBeFalsy();
    });
  });
});
