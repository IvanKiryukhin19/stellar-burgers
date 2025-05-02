import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../../slicesNames';
import { getOrdersApi } from '../../../utils/burger-api';

export const getOrders = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrders`,
  getOrdersApi
);
