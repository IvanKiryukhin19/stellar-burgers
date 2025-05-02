import { TLoginData } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { loginUserApi } from '../../../utils/burger-api';

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  loginUserApi
);
