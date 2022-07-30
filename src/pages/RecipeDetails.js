import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FoodDetails from '../components/FoodDetails';
import DrinkDetails from '../components/DrinkDetails';

const RecipeDetails = () => (
  <div>
    <Switch>
      <Route path="/foods/:id" component={ FoodDetails } />
      <Route path="/drinks/:id" component={ DrinkDetails } />
    </Switch>
  </div>
);

export default RecipeDetails;
