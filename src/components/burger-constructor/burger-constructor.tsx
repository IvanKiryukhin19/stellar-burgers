import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { getConstructorSelector } from '../../services/slices/burgerConstructor';
import { getUserSelector } from '../../services/slices/user';
import {
  getCreatedOrderSelector,
  getOrderRequestSelector
} from '../../services/slices/order';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/thunk/order/createOrder';
import { useDispatch } from '../../services/store';
import { createOrderActions } from '../../services/slices/order';
import { clearConstructor } from '../../services/slices/burgerConstructor';
import { getOrders } from '../../services/thunk/order/orders';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ingredientsFromStore = useSelector(getConstructorSelector);
  const orderData = useSelector(getCreatedOrderSelector);
  const userData = useSelector(getUserSelector);

  const constructorItems = {
    bun: ingredientsFromStore.bun,
    ingredients: ingredientsFromStore.ingredients
  };

  const orderRequest = useSelector(getOrderRequestSelector);

  const orderModalData = orderData;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userData) {
      return navigate('/login');
    }
    dispatch(createOrder(ingredientsFromStore.orderData));
    //dispatch(getOrders());
    navigate('/');
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(createOrderActions.clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
