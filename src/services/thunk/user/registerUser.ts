import { TRegisterData } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { registerUserApi } from '../../../utils/burger-api';

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  registerUserApi
);
