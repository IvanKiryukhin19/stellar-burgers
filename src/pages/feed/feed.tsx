import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { getFeedsSelector } from '../../services/slices/feeds/feeds';
import { getFeeds } from '../../services/thunk/feeds';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const feedsFromStore = useSelector(getFeedsSelector);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const orders: TOrder[] = feedsFromStore.feeds.orders;

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
