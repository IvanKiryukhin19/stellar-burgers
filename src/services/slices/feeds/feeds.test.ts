import { getFeeds } from '../../../services/thunk/feeds';
import feedsReducer, { initialState } from './feeds';
import { feedsData } from '../../../testData/feeds';

describe('тесты асинхронных экшенов', () => {
  describe('тестируем thunk-функцию getFeeds', () => {
    it('тестируем отправку запроса и статус pending', async () => {
      const newState = feedsReducer(initialState, getFeeds.pending('pending'));

      expect(newState.loading).toBeTruthy();
      expect(newState.error).toBeNull();
    });

    it('тестируем ошибку, запрос - rejected', async () => {
      const error: Error = {
        name: 'rejected',
        message: 'Ошибка получения заказов'
      };

      const newState = feedsReducer(
        initialState,
        getFeeds.rejected(error, 'rejected')
      );

      expect(newState.error).toEqual(error.message);
      expect(newState.loading).toBeFalsy();
    });

    it('тестируем rejected без сообщения об ошибке', async () => {
      const error: Error = {
        name: 'rejected',
        message: ''
      };

      const newState = feedsReducer(
        initialState,
        getFeeds.rejected(error, 'rejected')
      );

      expect(newState.error).toBeNull();
      expect(newState.loading).toBeFalsy();
    });

    it('тестируем получение заказов - fulfilled', async () => {
      const newState = feedsReducer(
        initialState,
        getFeeds.fulfilled(feedsData, 'fulfilled')
      );

      expect(newState.feeds.orders).toEqual(feedsData.orders);
      expect(newState.feeds.total).toEqual(feedsData.total);
      expect(newState.feeds.totalToday).toEqual(feedsData.totalToday);
      expect(newState.loading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
