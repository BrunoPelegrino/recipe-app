import React from 'react';
import { useLocalStorage } from 'react-use';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ProfileInfo = () => {
  const [emailLS, , removeEmailLS] = useLocalStorage('user');
  const [, , removeMealTokenToLS] = useLocalStorage('mealsToken');
  const [, , removeDrinkTokenLS] = useLocalStorage('cocktailsToken');
  const [, , removeDoneRecipes] = useLocalStorage('doneRecipes');
  const [, , removefavoriteRecipes] = useLocalStorage('favoriteRecipes');
  const [, , removeinProgressRecipes] = useLocalStorage('inProgressRecipes');
  const history = useHistory();
  
  const handleClick = () => {
    removeEmailLS();
    removeMealTokenToLS();
    removeDrinkTokenLS();
    removeDoneRecipes();
    removefavoriteRecipes();
    removeinProgressRecipes();
  };

  return (
    <div className="profile-info">
      <h2
        data-testid="profile-email"
      >
        { emailLS?.email }
      </h2>
      
      <br />
      
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        Home
      </button>
      
      <br />
      
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>

      <br />

      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>

      <br />

      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>
      </Link>
    </div>
  );
};

export default ProfileInfo;
