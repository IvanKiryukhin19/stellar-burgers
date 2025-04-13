import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { getFeedsSelector } from '../../services/slices/feeds';
import { useDispatch } from '../../services/store';
import { getFeeds } from '../../services/thunk/feeds';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);
  const feedsFromStore = useSelector(getFeedsSelector);

  const orders: TOrder[] = feedsFromStore.feeds.orders;
  const feed = {
    total: feedsFromStore.feeds.total,
    totalToday: feedsFromStore.feeds.totalToday
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
