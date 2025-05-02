import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { CONSTRUCTOR_SLICE_NAME } from '../../slicesNames';
import { TIngredient, TConstructorIngredient } from '@utils-types';

export type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
  //orderData: string[];
};

export const initialState: TConstructorItems = {
  bun: null,
  ingredients: []
  //orderData: []
};

export const constructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        //state.orderData.push(action.payload._id);

        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      [state.ingredients[index], state.ingredients[index + 1]] = [
        state.ingredients[index + 1],
        state.ingredients[index]
      ];
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      [state.ingredients[index - 1], state.ingredients[index]] = [
        state.ingredients[index],
        state.ingredients[index - 1]
      ];
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients = state.ingredients.filter(
        (item, itemIndex) => itemIndex !== index
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state,
    getOrderDataSelector: (state) =>
      state.bun
        ? [state.bun._id, ...state.ingredients.map((item) => item._id)]
        : state.ingredients.map((item) => item._id)
  }
});

export const {
  addIngredient,
  moveDownIngredient,
  moveUpIngredient,
  removeIngredient,
  clearConstructor
} = constructorSlice.actions;

export const { getConstructorSelector, getOrderDataSelector } =
  constructorSlice.selectors;

export default constructorSlice.reducer;
