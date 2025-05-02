import { createSlice } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../../slicesNames';
import { TOrder } from '@utils-types';
import { createOrder } from '../../thunk/order/createOrder';
import { isRejectedAction, isPendingAction } from '../../matchers';
import { getOrders } from '../../thunk/order/orders';
import { getOrderByNumber } from '../../thunk/order/orderByName';

type TNewOrder = {
  order: TOrder | null;
  name: string | null;
  loading: boolean;
  error: string | null;
  orders: TOrder[] | null;
  orderRequest: boolean;
  orderByNumber: TOrder | null;
};

export const initialState: TNewOrder = {
  order: null,
  name: null,
  loading: false,
  error: null,
  orders: null,
  orderRequest: false,
  orderByNumber: null
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  selectors: {
    getCreatedOrderSelector: (state) => state.order,
    getCreatedOrderLoadingSelector: (state) => state.loading,
    getOrdersSelector: (state) => state.orders,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderByNumberSelector: (state) => state.orderByNumber
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.order = action.payload.order;
        state.loading = false;
        state.orderRequest = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByNumber = action.payload.orders[0];
      })
      //.addMatcher(isPendingAction, (state) => {
      //  state.loading = true;
      //})
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message ? action.error.message : null;
      });
  }
});

export const {
  getCreatedOrderSelector,
  getCreatedOrderLoadingSelector,
  getOrdersSelector,
  getOrderRequestSelector,
  getOrderByNumberSelector
} = orderSlice.selectors;
export const createOrderActions = orderSlice.actions;

export default orderSlice.reducer;
