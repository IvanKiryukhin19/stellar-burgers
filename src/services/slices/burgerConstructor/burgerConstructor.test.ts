import constructorSliceReducer, {
  addIngredient,
  moveDownIngredient,
  removeIngredient,
  moveUpIngredient,
  clearConstructor,
  initialState,
  getOrderDataSelector
} from './burgerConstructor';
import {
  burgerData,
  bunData,
  mainData,
  arrayIngredientsData,
  arrayDataWithoutBun
} from '../../../testData/burgerConstructor';

describe('тестируем синхронные экшены', () => {
  it('тестируем добавление булки в конструктор', () => {
    expect(initialState.bun).toBeNull();

    const bun = burgerData.bun;

    const newState = constructorSliceReducer(initialState, addIngredient(bun));

    expect(newState.bun?._id).toEqual(bun._id);
  });

  it('меняем булку', () => {
    const stateBeforeChange = burgerData;
    const chengedBun = bunData[0];
    expect(stateBeforeChange.bun._id).not.toEqual(chengedBun._id);

    const newState = constructorSliceReducer(
      stateBeforeChange,
      addIngredient(chengedBun)
    );

    expect(newState.bun?._id).toEqual(chengedBun._id);
  });

  it('тестируем добавление ингредиента в пустой конструктор', () => {
    const addedIngredient = mainData[0];
    const newState = constructorSliceReducer(
      initialState,
      addIngredient(addedIngredient)
    );

    expect(newState.ingredients.length).toEqual(1);
    expect(newState.ingredients[0]._id).toEqual(addedIngredient._id);
  });

  it('тестируем добавление ингредиента в пустой конструктор', () => {
    const stateBeforeAdded = burgerData;
    const addedIngredient = mainData[0];

    const newState = constructorSliceReducer(
      stateBeforeAdded,
      addIngredient(addedIngredient)
    );

    expect(stateBeforeAdded.ingredients.length).toEqual(2);
    expect(newState.ingredients.length).toEqual(3);
    expect(newState.ingredients[newState.ingredients.length - 1]._id).toEqual(
      addedIngredient._id
    );
  });

  it('тестируем перемещение ингредиента вверх', () => {
    const stateBeforeMoveUp = burgerData;

    const newState = constructorSliceReducer(
      stateBeforeMoveUp,
      moveUpIngredient(1)
    );

    expect(newState.ingredients[0]._id).toEqual(
      stateBeforeMoveUp.ingredients[1]._id
    );
    expect(newState.ingredients[1]._id).toEqual(
      stateBeforeMoveUp.ingredients[0]._id
    );
  });

  it('тестируем перемещение ингредиента вниз', () => {
    const stateBeforeMoveDown = burgerData;

    const newState = constructorSliceReducer(
      stateBeforeMoveDown,
      moveDownIngredient(0)
    );

    expect(newState.ingredients[0]._id).toEqual(
      stateBeforeMoveDown.ingredients[1]._id
    );
    expect(newState.ingredients[1]._id).toEqual(
      stateBeforeMoveDown.ingredients[0]._id
    );
  });

  it('тестируем удаление ингредиента', () => {
    const stateBeforeRemove = burgerData;

    const newState = constructorSliceReducer(burgerData, removeIngredient(0));

    expect(newState.ingredients.length).toEqual(
      stateBeforeRemove.ingredients.length - 1
    );
    expect(newState.ingredients).not.toContainEqual(
      stateBeforeRemove.ingredients[0]
    );
  });

  it('тестируем очистку конструктора', () => {
    const stateBeforeClear = burgerData;

    const newState = constructorSliceReducer(
      stateBeforeClear,
      clearConstructor()
    );

    expect(newState).toEqual(initialState);
  });

  it('тестируем селектор на получение массива ингредиентов для заказа', () => {
    const dataFromStore = getOrderDataSelector({
      burgerConstructor: burgerData
    });
    expect(dataFromStore).toEqual(arrayIngredientsData);
  });

  it('тестируем селектор на получение массива без Б`улки', () => {
    const dataFromStore = getOrderDataSelector({
      burgerConstructor: { bun: null, ingredients: burgerData.ingredients }
    });
    expect(dataFromStore).toEqual(arrayDataWithoutBun);
  });
});
