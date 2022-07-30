import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

const FinishButton = ({ ingredientsArray,
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
  tags }) => {
  const history = useHistory();
  const [DoneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);
  const checkedIngredients = useSelector((state) => state.reducer.checkedIngredients);
  const handleClick = () => {
    setDoneRecipes([...DoneRecipes, {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
      doneData: new Date(),
      tags: [tags],

    }]);
    history.push('/done-recipes');
  };
  return (
    <div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="start-button"
        disabled={
          checkedIngredients !== ingredientsArray.length
        }
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
    </div>
  );
};

FinishButton.propTypes = {
  ingredientsArray: PropTypes.string,
}.isRequired;

export default FinishButton;
