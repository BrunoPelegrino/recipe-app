
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getDrinksCategorysToState,
  getMealsCategorysToState,
  getDrinksByCategoryToState,
  getMealsByCategoryToState,
  getMealsToState,
  getDrinksToState,
  sendFilterLocal,
} from '../redux/actions';

const FIVE = 5;

const SelectionFilter = () => {
  const history = useHistory();
  const drinksCategoryName = useSelector((state) => state.reducer.drinksCategorys);
  const mealsCategoryName = useSelector((state) => state.reducer.mealsCategorys);
  const dispatch = useDispatch();
  const [lastCategory, setLastCategory] = useState('');

  useEffect(() => {
    const check = () => {
      if (history.location.pathname === '/drinks') {
        dispatch(getDrinksCategorysToState());
      } else {
        dispatch(getMealsCategorysToState());
      }
    };
    check();
  }, []);

  const drinksCategory = drinksCategoryName.map((k) => k.strCategory).slice(0, FIVE);
  const mealsCategory = mealsCategoryName.map((k) => k.strCategory).slice(0, FIVE);

  const onClickButton = ({ target: { value } }) => {
    dispatch(sendFilterLocal(false));
    if (history.location.pathname === '/drinks') {
      dispatch(getDrinksToState(value));
    }
    dispatch(getMealsToState(value));
  };

  const handleToggle = ({ target: { value } }) => {
    setLastCategory(value);
    dispatch(sendFilterLocal(false));
    if (lastCategory === value) {
      return history.location.pathname === '/drinks'
        ? dispatch(getDrinksToState(''))
        : dispatch(getMealsToState(''));
    }
    return history.location.pathname === '/drinks'
      ? dispatch(getDrinksByCategoryToState(value))
      : dispatch(getMealsByCategoryToState(value));
  };

  return (
    <div className="flex flex-wrap items-baseline justify-center mx-3 gap-2 my-2">
      <button
        className="btn btn-primary btn-active w-20"
        type="button"
        id="All-category"
        name="All-category-filter"
        value=""
        data-testid="All-category-filter"
        onClick={ onClickButton }
      >
        All

      </button>
      { (history.location.pathname === '/drinks' ? (
        drinksCategory.map((categoryName) => (

          <button
            className="btn btn-primary btn-active"
            key={ categoryName }
            type="button"
            id={ `${categoryName}-category-filter` }
            name={ `${categoryName}-category-filter` }
            value={ categoryName }
            data-testid={ `${categoryName}-category-filter` }
            onClick={ handleToggle }
          >
            {categoryName}
          </button>
        ))
      ) : (
        mealsCategory.map((category) => (
          <button
            className="btn btn-primary btn-active"
            key={ category }
            type="button"
            id={ `${category}-category-filter` }
            name={ `${category}-category-filter` }
            value={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ handleToggle }
          >
            {category}
          </button>
        ))
      ))}
    </div>

  );
};

export default SelectionFilter;
