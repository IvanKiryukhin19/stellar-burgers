import orderReducer, { initialState, createOrderActions } from './order';
//import { isRejectedAction } from '../../matchers';
import { feedsData } from '../../../testData/feeds';
import { getOrders } from '../../../services/thunk/order/orders';
import { createOrder } from '../../thunk/order/createOrder';
import { ordersData } from '../../../testData/orders';
import {
  orderData,
  orderDataResponse,
  orderNumberResponse
} from '../../../testData/order';
import { getOrderByNumber } from '../../../services/thunk/order/orderByName';

describe('Тесты синхронных экшенов', () => {
  it('Очистка заказа', () => {
    const initialStateWithData = {
      order: feedsData.orders[0],
      name: null,
      loading: false,
      error: null,
      orders: null,
      orderRequest: false,
      orderByNumber: null
    };

    const newState = orderReducer(
      initialStateWithData,
      createOrderActions.clearOrder()
    );

    expect(newState).toEqual(initialState);
  });
});

describe('Тест асинхронных экшенов', () => {
  describe('тестируем thunk-функцию getOrders', () => {
    it('тестируем ожидание получения заказов - pending', async () => {
      const newState = orderReducer(initialState, getOrders.pending('pending'));

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
    });

    it('тестируем получение заказов fulfilled', async () => {
      const newState = orderReducer(
        initialState,
        getOrders.fulfilled(ordersData.orders, 'fulfilled')
      );

      expect(newState.orders).toEqual(ordersData.orders);
      expect(newState.loading).toBeFalsy();
    });

    it('тестируем pending при оформлении заказа', async () => {
      const newState = orderReducer(
        initialState,
        createOrder.pending('pending', ordersData.orders[0].ingredients)
      );

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
      expect(newState.orderRequest).toBeTruthy();
    });

    it('тестируем успешное создание заказа - fulfilled', async () => {
      const newState = orderReducer(
        initialState,
        createOrder.fulfilled(
          orderDataResponse,
          'fulfilled',
          orderData.ingredients
        )
      );

      expect(newState.name).toEqual(orderDataResponse.name);
      expect(newState.order).toEqual(orderDataResponse.order);
      expect(newState.loading).toBeFalsy();
      expect(newState.orderRequest).toBeFalsy();
    });

    it('тестируем получение заказа по номеру', async () => {
      const newState = orderReducer(
        initialState,
        getOrderByNumber.fulfilled(
          orderNumberResponse,
          'fulfilled',
          orderData.number
        )
      );

      expect(newState.loading).toBeFalsy();
      expect(newState.orderByNumber).toEqual(orderNumberResponse.orders[0]);
    });

    it('тестируем isRejectedAction', async () => {
      const error: Error = {
        name: 'rejected',
        message: 'Ошибка выполнения запроса'
      };

      const arrayThunks = [getOrders, createOrder, getOrderByNumber];

      arrayThunks.forEach((thunk) => {
        const newSate = orderReducer(
          initialState,
          thunk.rejected(error, 'rejected')
        );

        expect(newSate.error).toEqual(error.message);
        expect(newSate.orderRequest).toBeFalsy();
        expect(newSate.loading).toBeFalsy();
      });
    });

    it('тестируем isRejectedAction', async () => {
      const error: Error = {
        name: 'rejected',
        message: ''
      };

      const arrayThunks = [getOrders, createOrder, getOrderByNumber];

      arrayThunks.forEach((thunk) => {
        const newSate = orderReducer(
          initialState,
          thunk.rejected(error, 'rejected')
        );

        expect(newSate.error).toBeNull();
        expect(newSate.orderRequest).toBeFalsy();
        expect(newSate.loading).toBeFalsy();
      });
    });
  });
});
