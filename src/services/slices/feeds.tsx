import { createSlice } from '@reduxjs/toolkit';
import { FEEDS_SLICE_NAME } from '../slicesNames';
import { TOrder } from '@utils-types';
import { getFeeds } from '../thunk/feeds';

type TFeedsState = {
  feeds: {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  };
  loading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

export const feedsSlice = createSlice({
  name: FEEDS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => state,
    getOnlyFeedsSelector: (state) => state.feeds.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload;
      });
  }
});

export const { getFeedsSelector, getOnlyFeedsSelector } = feedsSlice.selectors;
export const feedsActions = feedsSlice.actions;

export default feedsSlice.reducer;
