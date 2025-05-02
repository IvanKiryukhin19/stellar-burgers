import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/ingredients/ingredients';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientId = useParams();
  const ingredientsFromeStore = useSelector(getIngredientsSelector);

  const ingredientData = ingredientsFromeStore.ingredients.find(
    (item) => item._id === ingredientId.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
