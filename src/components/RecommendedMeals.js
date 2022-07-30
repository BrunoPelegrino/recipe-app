
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMealsToState } from '../redux/actions';

const RecommendedMeals = () => {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.reducer.mealsData);
  const MAX_REC_CARD = 6;

  useEffect(() => {
    dispatch(getMealsToState(''));
  }, []);

  return (
    <li>
      {[...meals].splice(0, MAX_REC_CARD).map((rec, i) => (
        <Link
          key={ i }
          to={ `/foods/${rec.idMeal}` }
          style={ { visibility: `${i < 2 ? 'visible' : 'hidden'}` } }
        >
          <div className="recipe-card-recommended">
            <label htmlFor={ `slide${i}` }>
              <input
                type="radio"
                id={ `slide${i}` }
                name="slide"
                checked
              />
            </label>
            <img
              data-testid={ `${i}-recomendation-card` }
              src={ rec.strMealThumb }
              alt={ rec.strMeal }
              className="recipe-item-recommended"
            />

            <p
              data-testid={ `${i}-recomendation-title` }
            >
              {rec.strMeal}

            </p>
          </div>
        </Link>))}
    </li>
  );
};

export default RecommendedMeals;
