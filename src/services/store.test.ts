import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/store';
import { initialState as userInitialState } from '../services/slices/user/user';
import { initialState as orderInitialState } from '../services/slices/order/order';
import { initialState as ingredientsInitialState } from '../services/slices/ingredients/ingredients';
import { initialState as constructorInitialState } from '../services/slices/burgerConstructor/burgerConstructor';
import { initialState as feedsInitialState } from '../services/slices/feeds/feeds';
import constructorSliceReducer from '../services/slices/burgerConstructor/burgerConstructor';
import ingredientSliceReducer from '../services/slices/ingredients/ingredients';
import feedsSliceReducer from '../services/slices/feeds/feeds';
import orderSliceReducer from '../services/slices/order/order';
import userSliceReducer from '../services/slices/user/user';

describe('проверяем инициализацию rootReducer', () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      burgerConstructor: constructorInitialState,
      feeds: feedsInitialState,
      ingredients: ingredientsInitialState,
      order: orderInitialState,
      user: userInitialState
    }
  });

  it('тест конструктора', () => {
    expect(store.getState().burgerConstructor).toEqual(
      constructorSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const arrayActions = [
      'addIngredient',
      'moveDownIngredient',
      'moveUpIngredient',
      'removeIngredient',
      'clearConstructor'
    ];

    arrayActions.forEach((action) => {
      store.dispatch({ type: action });
      expect(store.getState().burgerConstructor).toEqual(
        constructorInitialState
      );
    });
  });

  it('тестируем ингредиенты', () => {
    expect(store.getState().ingredients).toEqual(
      ingredientSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    store.dispatch({ type: 'getIngredients' });
    expect(store.getState().ingredients).toEqual(ingredientsInitialState);
  });

  it('тестируем заказы', () => {
    expect(store.getState().feeds).toEqual(
      feedsSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    store.dispatch({ type: 'getFeeds' });
    expect(store.getState().feeds).toEqual(feedsInitialState);
  });

  it('тестируем заказы пользователя', () => {
    expect(store.getState().order).toEqual(
      orderSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const arrayThunks = ['createOrder', 'getOrders', 'getOrderByNumber'];

    arrayThunks.forEach((thunk) => {
      store.dispatch({ type: thunk });
      expect(store.getState().order).toEqual(orderInitialState);
    });
  });

  it('тестируем пользователя', () => {
    expect(store.getState().user).toEqual(
      userSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const arrayThunks = [
      'getUser',
      'registerUser',
      'loginUser',
      'updateUser',
      'logout'
    ];
    arrayThunks.forEach((thunk) => {
      store.dispatch({ type: thunk });
      expect(store.getState().user).toEqual(userInitialState);
    });
  });
});
