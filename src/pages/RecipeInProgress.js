import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FoodInProgress from '../components/FoodInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

const RecipeInProgress = () => (
  <div>
    <Switch>
      <Route path="/foods/:id/in-progress" component={ FoodInProgress } />
      <Route path="/drinks/:id/in-progress" component={ DrinkInProgress } />
    </Switch>
  </div>
);

export default RecipeInProgress;
