import React from 'react';
import { useDispatch } from 'react-redux';
import { sendFilterType } from '../redux/actions';

const DoneRecipesFilter = () => {
  const dispatch = useDispatch();
  const handleClick = ({ target: { value } }) => {
    dispatch(sendFilterType(value));
  };
  return (
    <div>
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
