import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getOrdersSelector } from '../../services/slices/order';
import { useDispatch } from '../../services/store';
import { getOrders } from '../../services/thunk/order/orders';
import { useEffect } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const dataOrders = useSelector(getOrdersSelector);
  const orders: TOrder[] = dataOrders ?? [];
  return <ProfileOrdersUI orders={orders} />;
};
