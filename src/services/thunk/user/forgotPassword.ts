import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { forgotPasswordApi } from '@api';

const data: { email: string } = {
  email: ''
};

export const forgotPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/forgotPassword`,
  async () => await forgotPasswordApi(data)
);
