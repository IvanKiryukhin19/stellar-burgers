import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { getUserApi } from '../../../utils/burger-api';

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  getUserApi
);
