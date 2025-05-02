import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from '../../slicesNames';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../../thunk/ingredients';

export type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredientsSelector } = ingredientsSlice.selectors;
export const ingredientsActions = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
