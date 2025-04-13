import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getOrdersSelector } from '../../services/slices/order';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dataOrders = useSelector(getOrdersSelector);
  const orders: TOrder[] = dataOrders ?? [];
  return <ProfileOrdersUI orders={orders} />;
};
