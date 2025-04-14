import { TLoginData } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { loginUserApi } from '@api';

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  loginUserApi
);
