import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
// faltando tag
const DoneRecipesCard = () => {
  const filterType = useSelector((state) => state.reducer.filterType);
  const [favoriteRecipes,
  ] = useLocalStorage('doneRecipes', []);

  const [clicked, setClick] = useState(false);

  const handleClick = (recipe) => {
    if (recipe.alcoholicOrNot) {
      copy(`http://localhost:3000/drinks/${recipe.id}`);
      setClick(true);
    } else copy(`http://localhost:3000/foods/${recipe.id}`);
    setClick(true);
  };

  return (
    <div>
      { favoriteRecipes
        .filter((doneRecipe) => doneRecipe.type.includes(filterType))
        .map((recipe, index) => (
          <div key={ recipe.id }>
            { recipe.type === 'food'
              ? (
                <Link
                  to={ `/foods/${recipe.id}` }
                >
                  <h3
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h3>
                </Link>
              )
              : (
                <Link
                  to={ `/drinks/${recipe.id}` }
                >
                  <h3
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h3>
                </Link>
              )}
            { recipe.type === 'food'
              ? (
                <Link
                  to={ `/foods/${recipe.id}` }
                >
                  <img
                    width="100px"
                    src={ recipe.image }
                    alt="img card"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>)
              : (
                <Link
                  to={ `/drinks/${recipe.id}` }
                >
                  <img
                    width="100px"
                    src={ recipe.image }
                    alt="img card"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
              )}
            { recipe.alcoholicOrNot
          && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </p>
          )}
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.nationality}
              {' '}
              {'-'}
              {' '}
              {recipe.category}
            </p>
            <span
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </span>
            { clicked ? <p>Link copied!</p> : (
              <button
                clicked={ clicked }
                type="button"
                onClick={ () => handleClick(recipe) }
              >
                <img
                  src={ shareIcon }
                  width="15px"
                  alt="share-icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>)}
            <p
              data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
            >
              {recipe.tags[0]}
            </p>
            <p
              data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
            >
              {recipe.tags[1]}
            </p>
          </div>
        ))}
    </div>

  );
};

export default DoneRecipesCard;
