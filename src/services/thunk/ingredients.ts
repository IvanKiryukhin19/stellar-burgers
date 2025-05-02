import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from '../slicesNames';
import { getIngredientsApi } from '../../utils/burger-api';

export const getIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/getIngredients`,
  getIngredientsApi
);
