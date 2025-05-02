import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../../slicesNames';
import { logoutApi } from '../../../utils/burger-api';

export const logout = createAsyncThunk(`${USER_SLICE_NAME}/logout`, logoutApi);
