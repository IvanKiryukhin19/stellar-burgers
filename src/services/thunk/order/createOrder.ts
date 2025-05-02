import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../../slicesNames';
import { orderBurgerApi } from '../../../utils/burger-api';

export const createOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/createOrder`,
  orderBurgerApi
);
