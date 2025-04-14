import { TOrder } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEEDS_SLICE_NAME } from '../slicesNames';
import { getFeedsApi } from '@api';

export const getFeeds = createAsyncThunk(
  `${FEEDS_SLICE_NAME}/getFeeds`,
  getFeedsApi
);
