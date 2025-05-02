import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { forgotPasswordApi } from '../../../utils/burger-api';

export const forgotPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/forgotPassword`,
  forgotPasswordApi
);
