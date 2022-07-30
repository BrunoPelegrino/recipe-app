import React from 'react';
import PropTypes from 'prop-types';
import RecommendedMeals from './RecommendedMeals';
import RecommendedDrinks from './RecommendedDrinks';

const Recommended = ({ isDrink }) => (
  <ul className="recipes-cards-recommended">
    {isDrink ? (<RecommendedMeals />) : (<RecommendedDrinks />)}
  </ul>
);

Recommended.propTypes = {
  isDrink: PropTypes.bool.isRequired,
};

export default Recommended;
