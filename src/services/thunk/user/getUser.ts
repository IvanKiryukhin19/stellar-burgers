import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { getUserApi } from '@api';

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async () => await getUserApi()
);
