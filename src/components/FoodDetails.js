
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMealDetailsToState } from '../redux/actions';
import Cover from './Cover';
import home from '../images/home.svg'; 
import StartButton from './StartButton';
import Recommended from './Recommended';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Video from './Video';

const FoodDetails = () => {
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
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img 
        src={ home }
        alt="home button"
        width="30px"
        />
      </button>
      { mealDetails.length && <Cover isDrink={ false } /> }
      <Instructions isDrink={ false } />
      <Ingredients
        ingredientsArray={ ingredients }
        measuresArray={ measures }
        recipeId={ mealDetails[0]?.idMeal }
      />
      <div className='flex justify-center items-center'>
      <Video
        videoId={ mealDetails[0] !== undefined
          ? mealDetails[0].strYoutube.split('v=')[1]
          : '' }
      />
      </div>
      <StartButton id={ idMeal } />
      <Recommended
        isDrink={ false }
      />
    </div>
  );
};
export default FoodDetails;
