/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMealDetailsToState } from '../redux/actions';
import Cover from './Cover';
import FinishButton from './FinishButton';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

const FoodInProgress = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const idMeal = history.location.pathname.split('/');
  const mealDetails = useSelector((state) => state.reducer.mealDetails);
  const ingredients = mealDetails.length ? Object.entries(...mealDetails)
    .filter((meal) => meal[0].includes('strIngredient') && meal[1])
    : [];
  const measures = mealDetails.length ? Object.entries(...mealDetails)
    .filter((meal) => meal[0].includes('strMeasure'))
    : [];
  useEffect(() => {
    dispatch(getMealDetailsToState(idMeal[2]));
  }, []);
  return (
    <div>
      <Cover isDrink={ false } />
      <Ingredients
        ingredientsArray={ ingredients }
        measuresArray={ measures }
        recipeId={ mealDetails[0]?.idMeal }
      />
      <Instructions isDrink={ false } />
      <FinishButton
        ingredientsArray={ ingredients }
        id={ mealDetails[0]?.idMeal }
        type="food"
        nationality={ mealDetails[0]?.strArea }
        category={ mealDetails[0]?.strCategory }
        alcoholicOrNot=""
        name={ mealDetails[0]?.strMeal }
        image={ mealDetails[0]?.strMealThumb }
        tags={ mealDetails[0]?.strTags }
      />
    </div>
  );
};

export default FoodInProgress;
