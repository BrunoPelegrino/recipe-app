
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDrinkDetailsToState } from '../redux/actions';
import Cover from './Cover';
import StartButton from './StartButton';
import Recommended from './Recommended';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

const DrinkDetails = () => {
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
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        Home
      </button>
      <h1>DrinkDetails</h1>
      { drinkDetails.length && <Cover isDrink /> }
      <Instructions isDrink />
      <h1>Olá do DnrinkDetails</h1>
      <StartButton id={ idDrink } />
      <Ingredients
        ingredientsArray={ ingredients }
        measuresArray={ measures }
        recipeId={ drinkDetails[0]?.idDrink }
      />
      <Recommended
        isDrink
      />

    </div>
  );
};

export default DrinkDetails;
