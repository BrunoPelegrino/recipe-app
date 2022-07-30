import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/foods/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/foods" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
      </Switch>
    </div>
  );
}

export default App;
