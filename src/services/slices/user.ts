import { createSlice } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../slicesNames';
import { TUser } from '@utils-types';
import { getUser } from '../thunk/user/getUser';
import { registerUser } from '../thunk/user/registerUser';
import { loginUser } from '../thunk/user/loginUser';
import { isPendingAction, isRejectedAction } from '../matchers';
import { logout } from '../thunk/user/logout';
import { updateUser } from '../../services/thunk/user/updateUser';

type TUserResponse = {
  success: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: TUserResponse = {
  success: false,
  isAuthChecked: false,
  user: null,
  loading: false,
  error: ''
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
    }
  },
  selectors: {
    getUserSuccessSelector: (state) => state.success,
    getUserErrorSelector: (state) => state.error,
    getUserSelector: (state) => state.user,
    getUserIsAuthSelector: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
        state.isAuthChecked = true;
      });
  }
});

export const {
  getUserSuccessSelector,
  getUserErrorSelector,
  getUserSelector,
  getUserIsAuthSelector
} = userSlice.selectors;
export const userActions = userSlice.actions;

export default userSlice.reducer;
