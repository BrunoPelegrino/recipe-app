
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useDispatch } from 'react-redux';
import { sendCheckedIngredients } from '../redux/actions';

const Ingredients = ({ ingredientsArray, measuresArray, recipeId }) => {
  const { location: { pathname } } = useHistory();
  const dispatch = useDispatch();
  const [inProgressRecipes, setInProgressRecipes] = useLocalStorage('inProgressRecipes',
    {
      cocktails: {},
      meals: {},
    });
  const isInProgress = pathname.includes('in-progress');
  const foodOrDrink = pathname.includes('drinks') ? 'cocktails' : 'meals';
  const oldValue = inProgressRecipes[foodOrDrink][recipeId];
  useEffect(() => {
    dispatch(sendCheckedIngredients(oldValue?.length));
  });

  const handleCheckbox = ({ target: { value } }) => {
    if (oldValue === undefined) {
      return setInProgressRecipes({ ...inProgressRecipes,
        [foodOrDrink]: {
          ...inProgressRecipes[foodOrDrink],
          [recipeId]: [value],
        } });
    }
    if (oldValue?.some((check) => check === value)) {
      return setInProgressRecipes({ ...inProgressRecipes,
        [foodOrDrink]: {
          ...inProgressRecipes[foodOrDrink],
          [recipeId]: oldValue.filter((old) => old !== value),
        } });
    }
    return setInProgressRecipes({ ...inProgressRecipes,
      [foodOrDrink]: {
        ...inProgressRecipes[foodOrDrink],
        [recipeId]: [...oldValue, value],
      } });
  };

  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {
          ingredientsArray.map((ingredient, i) => (

            isInProgress
              ? (
                <li key={ `${i} ${ingredient[1]}` }>
                  <label
                    htmlFor={ `ingredient-list-${i}` }
                    className={ oldValue?.some((check) => check.includes(ingredient[1]))
                      ? 'checkbox-checked' : null }
                    data-testid={ `${i}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ `ingredient-list-${i}` }
                      onClick={ handleCheckbox }
                      onChange={ () => {} }
                      value={ `${ingredient[1]} ${measuresArray[i][1]}` }
                      checked={ oldValue?.some((check) => check.includes(ingredient[1])) }
                    />
                    {ingredient[1]}
                    {' '}
                    {measuresArray[i][1]}
                  </label>
                </li>
              )
              : (
                <li
                  key={ `${ingredient[1]}` }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {ingredient[1]}
                  {' '}
                  {measuresArray[i][1]}
                </li>
              )
          ))
        }
      </ul>
    </div>
  );
};

Ingredients.propTypes = {
  ingredientsArray: PropTypes.string,
  measuresArray: PropTypes.string,
  recipeId: PropTypes.string,

}.isRequired;

export default Ingredients;
