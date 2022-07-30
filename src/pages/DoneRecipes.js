import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';
import DoneRecipesFilter from '../components/DoneRecipesFilter';

const DoneRecipes = ({ history }) => (
  <div>
    <Header title="Done Recipes" history={ history } />
    <DoneRecipesFilter />
    <DoneRecipesCard />
  </div>
);

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.fuc,
  }),
}.isRequired;

export default DoneRecipes;
