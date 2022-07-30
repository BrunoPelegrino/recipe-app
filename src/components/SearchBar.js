import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDrinksByFisrtLetterToState,
  getDrinksByIngredientToState,
  getDrinksToState,
  getMealsByFisrtLetterToState,
  getMealsByIngredientToState,
  getMealsToState,
  sendFilterLocal } from '../redux/actions';

const SeachBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [filterInput, setFilterInput] = useState('');
  const [filterRadio, setFilterRadio] = useState('');
  const myActions = {
    foods: {
      filterByName: getMealsToState,
      filterByFirstLetter: getMealsByFisrtLetterToState,
      filterByIngredient: getMealsByIngredientToState,
    },
    drinks: {
      filterByName: getDrinksToState,
      filterByFirstLetter: getDrinksByFisrtLetterToState,
      filterByIngredient: getDrinksByIngredientToState,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendFilterLocal(true));
    if (history.location.pathname === '/foods') {
      dispatch(myActions.foods[filterRadio](filterInput));
    }
    if (history.location.pathname === '/drinks') {
      dispatch(myActions.drinks[filterRadio](filterInput));
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        data-testid="search-input"
        value={ filterInput }
        onChange={ ({ target: { value } }) => setFilterInput(value) }
      />
      <label htmlFor="filterByIngredient">
        <input
          name="filter"
          type="radio"
          id="filterByIngredient"
          data-testid="ingredient-search-radio"
          onClick={ ({ target: { id } }) => setFilterRadio(id) }
        />
        Ingredient
      </label>
      <label htmlFor="filterByName">
        <input
          name="filter"
          type="radio"
          id="filterByName"
          data-testid="name-search-radio"
          onClick={ ({ target: { id } }) => setFilterRadio(id) }

        />
        Name
      </label>
      <label htmlFor="filterByFirstLetter">
        <input
          name="filter"
          type="radio"
          id="filterByFirstLetter"
          data-testid="first-letter-search-radio"
          onClick={ ({ target: { id } }) => setFilterRadio(id) }

        />
        First Letter
      </label>
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </form>
  );
};

export default SeachBar;
