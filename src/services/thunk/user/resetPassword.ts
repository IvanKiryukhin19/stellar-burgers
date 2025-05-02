import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { resetPasswordApi } from '../../../utils/burger-api';

export const resetPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/resetPassword`,
  resetPasswordApi
);
