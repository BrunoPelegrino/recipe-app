import React from 'react';
import { useDispatch } from 'react-redux';
import { sendFilterType } from '../redux/actions';
import { useHistory } from 'react-router-dom';
import home from '../images/home.svg'; 

const DoneRecipesFilter = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = ({ target: { value } }) => {
    dispatch(sendFilterType(value));
  };
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
      <button
        data-testid="filter-by-all-btn"
        type="button"
        value=""
        onClick={ handleClick }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        value="food"
        onClick={ handleClick }

      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        value="drink"
        onClick={ handleClick }

      >
        Drinks
      </button>
    </div>
  );
};
export default DoneRecipesFilter;
