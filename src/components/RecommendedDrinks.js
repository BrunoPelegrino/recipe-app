
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
    <li class="carousel w-full">
      {[...drinks].splice(0, MAX_REC_CARD).map((rec, i) => (
        <Link
          key={ i }
          to={ `/drinks/${rec.idDrink}` }
          // style={ { visibility: `${i < 2 ? 'visible' : 'hidden'}` } }
        >
          <div 
            id={ i }
            className="
            flex
            card
            w-full
            h-full
            shadow-xl
            "
            >
            <figure className="carousel-item w-full">
            <img
              data-testid={ `${i}-recomendation-card` }
              src={ rec.strDrinkThumb }
              alt={ rec.strDrink }
              className="w-full"
            />
            </figure>
            <div className='card-body'>
            <p
              data-testid={ `${i}-recomendation-title` }
            >
              {rec.strDrink}

            </p>
            </div>
            </div>
        </Link>))}
    </li>
  );
};

export default RecommendedDrinks;
