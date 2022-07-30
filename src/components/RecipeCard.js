import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, idRecipe, title, image, isDrink }) => (
  <Link to={ isDrink ? `/drinks/${idRecipe}` : `/foods/${idRecipe}` }>
    <div
      data-testid={ `${id}-recipe-card` }
      className="
    card
    w-42
    bg-base-100
    shadow-xl"
    >
      <figure>
        <img
          data-testid={ `${id}-card-img` }
          src={ image }
          alt={ title }
        />
      </figure>
      <div className="card-body">

        <h2
          data-testid={ `${id}-card-name` }
          className="card-title justify-center"
        >
          {title}

        </h2>
      </div>
    </div>
  </Link>
);

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
  isDrink: PropTypes.bool.isRequired,
};

export default RecipeCard;
