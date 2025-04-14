import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { updateUserApi, TRegisterData } from '@api';

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  updateUserApi
);
