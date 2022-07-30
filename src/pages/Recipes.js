import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Foods from '../components/Foods';
import Drinks from '../components/Drinks';

const Recipes = () => (
  <div>
    <Switch>
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
    </Switch>
  </div>
);

export default Recipes;
