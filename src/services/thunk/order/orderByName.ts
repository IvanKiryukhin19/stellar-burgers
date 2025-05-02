import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../../slicesNames';
import { getOrderByNumberApi } from '../../../utils/burger-api';

export const getOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  getOrderByNumberApi
);
