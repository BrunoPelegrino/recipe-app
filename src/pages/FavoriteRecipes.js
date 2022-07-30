import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import DoneRecipesFilter from '../components/DoneRecipesFilter';

const FavoriteRecipes = ({ history }) => (
  <div>
    <Header title="Favorite Recipes" history={ history } />
    <DoneRecipesFilter />
    <FavoriteRecipeCard />
  </div>
);

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.fuc,
  }),
}.isRequired;

export default FavoriteRecipes;
