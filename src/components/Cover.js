import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const Cover = ({ isDrink }) => {
  const drinkDetails = useSelector((state) => state.reducer.drinkDetails);
  const mealDetails = useSelector((state) => state.reducer.mealDetails);
  const [isCopied, setIsCopied] = useState(false);
  /* const [verifyLS, setVerifyLS] = useState(false); */
  const [favoriteRecipes,
    setFavoriteRecipes,
  ] = useLocalStorage('favoriteRecipes', []);

  console.log('mealDetails', mealDetails);

  const history = useHistory();
  const pathSTR = history.location.pathname;
  const get = favoriteRecipes.find((item) => pathSTR.includes(item.id));

  const setURLRecipe = pathSTR.replace('/in-progress', '');

  const copyToClipboard = () => {
    copy(`http://localhost:3000${setURLRecipe}`);
    setIsCopied(true);
  };

  const setFavDrinkLS = () => {
    if (get !== undefined) {
      setFavoriteRecipes([...favoriteRecipes.filter((item) => item !== get)]);
    } else {
      setFavoriteRecipes([...favoriteRecipes, {
        id: drinkDetails[0].idDrink,
        type: 'drink',
        nationality: '',
        category: drinkDetails[0].strCategory,
        alcoholicOrNot: drinkDetails[0].strAlcoholic,
        name: drinkDetails[0].strDrink,
        image: drinkDetails[0].strDrinkThumb,
      }]);
    }
  };

  const setFavFoodLS = () => {
    if (get !== undefined) {
      setFavoriteRecipes([...favoriteRecipes.filter((item) => item !== get)]);
    } else {
      setFavoriteRecipes([...favoriteRecipes, {
        id: mealDetails[0].idMeal,
        type: 'food',
        nationality: mealDetails[0].strArea,
        category: mealDetails[0].strCategory,
        alcoholicOrNot: '',
        name: mealDetails[0].strMeal,
        image: mealDetails[0].strMealThumb,
      }]);
    }
  };
  console.log(favoriteRecipes);

  const getDrinkDetails = () => (
    <div className="w-screen flex flex-col justify-center items-center">
      <img
        src={ drinkDetails.length > 0 ? drinkDetails[0].strDrinkThumb : undefined }
        alt="imageRecipe"
        data-testid="recipe-photo"
        width="300"
        height="250"
        className="
        h-full"
      />
      <hr className='w-full h-0.4 bg-yellow-300' />
      <div className='flex justify-between w-full px-8 items-baseline'>
      <div>
      <h2 data-testid="recipe-title">
        { drinkDetails.length > 0 && drinkDetails[0].strDrink }
      </h2>
      <p data-testid="recipe-category">
        { drinkDetails.length > 0 && drinkDetails[0].strAlcoholic}
      </p>
      </div>
      <div className='flex gap-3 mb-3'>
      <button
        type="button"
        onClick={ copyToClipboard }
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="shareIcon"
        />
      </button>

      {
        isCopied && <h4>Link copied!</h4>
      }

      <button
        type="button"
        onClick={ setFavDrinkLS }
      >
        <img
          src={ favoriteRecipes.some((item) => pathSTR.includes(item.id))
            ? blackHeartIcon
            : whiteHeartIcon }
          data-testid="favorite-btn"
          alt="blackHeartIcon"
        />
        </button>
      </div>
    </div>
  </div>
  );

  const getMealDetails = () => (
    <div className="w-screen flex flex-col justify-center items-center">
      <img
        src={ mealDetails.length > 0 ? mealDetails[0].strMealThumb : undefined }
        alt="imageRecipe"
        data-testid="recipe-photo"
        width="300"
        height="250"
        className="
        h-full"
      />
      <hr className='w-full h-0.4 bg-yellow-300' />
      <div className='flex justify-between w-full px-8 items-baseline'>
      <div>
      <h2 data-testid="recipe-title">
        { mealDetails.length > 0 && mealDetails[0].strMeal }
      </h2>
      <p data-testid="recipe-category">
        { mealDetails.length > 0 && mealDetails[0].strCategory }
      </p>
      </div>
      <div className='flex gap-3 mb-3'>
      <button
        type="button"
        onClick={ copyToClipboard }
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="shareIcon"
        />
      </button>

      {
        isCopied && <h4>Link copied!</h4>
      }

      <button
        type="button"
        onClick={ setFavFoodLS }
      >
        <img
          src={ favoriteRecipes.some((item) => pathSTR.includes(item.id))
            ? blackHeartIcon
            : whiteHeartIcon }
          alt="blackHeartIcon"
          data-testid="favorite-btn"
        />
        </button>
      </div>
    </div>
  </div>
  );
  return (
    <div>
      {

        isDrink ? getDrinkDetails() : getMealDetails()

      }
    </div>
  );
};

Cover.propTypes = {
  isDrink: PropTypes.bool.isRequired,
};

export default Cover;
