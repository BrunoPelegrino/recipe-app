/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDrinkDetailsToState } from '../redux/actions';
import Cover from './Cover';
import FinishButton from './FinishButton';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

const DrinkInProgress = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const idDrink = history.location.pathname.split('/');
  const drinkDetails = useSelector((state) => state.reducer.drinkDetails);
  const ingredients = drinkDetails.length ? Object.entries(...drinkDetails)
    .filter((drink) => drink[0].includes('strIngredient') && drink[1])
    : [];
  const measures = drinkDetails.length ? Object.entries(...drinkDetails)
    .filter((drink) => drink[0].includes('strMeasure'))
    : [];

  useEffect(() => {
    dispatch(getDrinkDetailsToState(idDrink[2]));
  }, []);
  return (
    <div>
      <Cover isDrink />
      <Ingredients
        ingredientsArray={ ingredients }
        measuresArray={ measures }
        recipeId={ drinkDetails[0]?.idDrink }
      />
      <Instructions isDrink />
      <FinishButton
        ingredientsArray={ ingredients }
        id={ drinkDetails[0]?.idDrink }
        type="drink"
        nationality=""
        category={ drinkDetails[0]?.strCategory }
        alcoholicOrNot={ drinkDetails[0]?.strAlcoholic }
        name={ drinkDetails[0]?.strDrink }
        image={ drinkDetails[0]?.strDrinkThumb }
        tags={ drinkDetails[0]?.strTags }
      />
    </div>
  );
};

export default DrinkInProgress;
