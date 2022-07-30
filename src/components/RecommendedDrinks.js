
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDrinksToState } from '../redux/actions';

const RecommendedDrinks = () => {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.reducer.drinksData);
  const MAX_REC_CARD = 6;

  useEffect(() => {
    dispatch(getDrinksToState(''));
  }, []);

  return (
    <li>
      {[...drinks].splice(0, MAX_REC_CARD).map((rec, i) => (
        <Link
          key={ i }
          to={ `/drinks/${rec.idDrink}` }
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
              src={ rec.strDrinkThumb }
              alt={ rec.strDrink }
              className="recipe-item-recommended"
            />

            <p
              data-testid={ `${i}-recomendation-title` }
            >
              {rec.strDrink}

            </p>
          </div>
        </Link>))}
    </li>
  );
};

export default RecommendedDrinks;
