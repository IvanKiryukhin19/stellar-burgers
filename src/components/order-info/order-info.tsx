import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { getOrderByNumber } from '../../services/thunk/order/orderByName';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const dataIngredients = useSelector(getIngredientsSelector);

  //const orderData = {
  //  createdAt: '',
  //  ingredients: [],
  //  _id: '',
  //  status: '',
  //  name: '',
  //  updatedAt: 'string',
  //  number: 0
  //};

  const orderNumber = useParams();

  const orderData = useSelector((state) => {
    let order = state.feeds.feeds.orders.find(
      (item) => item.number.toString() === orderNumber.number
    );
    if (order) return order;

    order = state.order.orders?.find(
      (item) => item.number === Number(orderNumber)
    );
    if (order) return order;

    return state.order.orderByNumber;
  });

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumber(Number(orderNumber.number)));
    }
  }, []);

  const ingredients: TIngredient[] = dataIngredients.ingredients;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
