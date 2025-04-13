import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { resetPasswordApi } from '@api';

const data: { token: string; password: string } = {
  token: '',
  password: ''
};

export const resetPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/resetPassword`,
  async () => await resetPasswordApi(data)
);
