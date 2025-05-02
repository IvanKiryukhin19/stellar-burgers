import ingredientsReducer, { initialState } from './ingredients';
import { getIngredients } from '../../../services/thunk/ingredients';
import { ingredients } from '../../../testData/ingredients';

describe('Тесты асинхронных экшенов', () => {
  describe('тестируем thunk-функцию getIngredients', () => {
    it('тестируем состояние запоса pending', async () => {
      const newState = ingredientsReducer(
        initialState,
        getIngredients.pending('pending')
      );

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
    });

    it('тестируем rejected', async () => {
      const error: Error = {
        name: 'rejected',
        message: 'Ошибка запроса ингредиентов'
      };

      const newState = ingredientsReducer(
        initialState,
        getIngredients.rejected(error, 'rejected')
      );

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });

    it('тестируем rejected без сообщения об ошибке', () => {
      const error: Error = {
        name: 'rejected',
        message: ''
      };

      const newState = ingredientsReducer(
        initialState,
        getIngredients.rejected(error, 'rejected')
      );

      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBeNull();
    });

    it('тестируем fulfilled', async () => {
      const newState = ingredientsReducer(
        initialState,
        getIngredients.fulfilled(ingredients, 'fulfilled')
      );

      expect(newState.ingredients).toEqual(ingredients);
      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
