const drinks = require('../../../../cypress/mocks/drinks');
const oneDrink = require('../../../../cypress/mocks/oneDrink');
const ginDrinks = require('../../../../cypress/mocks/ginDrinks');
const ordinaryDrinks = require('../../../../cypress/mocks/ordinaryDrinks');
const cocktailDrinks = require('../../../../cypress/mocks/cocktailDrinks');
const milkDrinks = require('../../../../cypress/mocks/milkDrinks');
const otherDrinks = require('../../../../cypress/mocks/otherDrinks');
const cocoaDrinks = require('../../../../cypress/mocks/cocoaDrinks');
const emptyDrinks = require('../../../../cypress/mocks/emptyDrinks');
const drinkCategories = require('../../../../cypress/mocks/drinkCategories');
const drinkIngredients = require('../../../../cypress/mocks/drinkIngredients');
const drinksByIngredient = require('../../../../cypress/mocks/drinksByIngredient');
const oneDrinkId15997 = require('../../../../cypress/mocks/oneDrinkId15997');

const fetchDrinks = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(drinkCategories); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') { return Promise.resolve(drinkIngredients); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') { return Promise.resolve(drinksByIngredient); }

    if (
      url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
    ) { return Promise.resolve(oneDrink); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') { return Promise.resolve(oneDrinkId15997); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin') { return Promise.resolve(ginDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') { return Promise.resolve(ordinaryDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') { return Promise.resolve(cocktailDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake') { return Promise.resolve(milkDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown') { return Promise.resolve(otherDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') { return Promise.resolve(cocoaDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau') { return Promise.resolve(emptyDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinks); }

    return Promise.reject(new Error('Invalid url'));
  },
});

export default fetchDrinks;
