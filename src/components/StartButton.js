import React from 'react';
import { PropTypes } from 'prop-types';
import { useLocalStorage } from 'react-use';
import { useHistory } from 'react-router-dom';

const StartButton = ({ id }) => {
  const history = useHistory();
  const [doneRecipes] = useLocalStorage('doneRecipes');
  const [inProgressRecipes] = useLocalStorage('inProgressRecipes', {
    cocktails: {},
    meals: {},
  });
  const myKey = history.location.pathname.includes('drinks')
    ? 'cocktails' : 'meals';
  const checkProgressRecipes = () => Object.keys(inProgressRecipes[myKey])
    .some((recipe) => recipe === id[2]);

  const checkDoneRecipes = () => {
    if (doneRecipes !== undefined && doneRecipes?.length > 0) {
      return doneRecipes.some((recipe) => recipe.id !== id[2]);
    }
    return true;
  };
  return (
    <div>
      {
        checkDoneRecipes()
        && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-button"
            onClick={ () => history.push(`/${id[1]}/${id[2]}/in-progress`) }
          >
            {
              checkProgressRecipes()
                ? 'Continue Recipe'
                : 'Start Recipe'
            }

          </button>
        )
      }

    </div>
  );
};

StartButton.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default StartButton;
