const meals = require('../../../../cypress/mocks/meals');
const oneMeal = require('../../../../cypress/mocks/oneMeal');
const soupMeals = require('../../../../cypress/mocks/soupMeals');
const beefMeals = require('../../../../cypress/mocks/beefMeals');
const breakfastMeals = require('../../../../cypress/mocks/breakfastMeals');
const chickenMeals = require('../../../../cypress/mocks/chickenMeals');
const dessertMeals = require('../../../../cypress/mocks/dessertMeals');
const mealCategories = require('../../../../cypress/mocks/mealCategories');
const mealIngredients = require('../../../../cypress/mocks/mealIngredients');
const mealsByIngredient = require('../../../../cypress/mocks/mealsByIngredient');
const areas = require('../../../../cypress/mocks/areas');
/* const goatMeals = require('../../../cypress/mocks/goatMeals'); */
const emptyMeals = require('../../../../cypress/mocks/emptyMeals');
/* const japaneseMeals = require('../../../cypress/mocks/japaneseMeals');
const italianMeals = require('../../../cypress/mocks/italianMeals'); */

const fetchMeals = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(mealCategories); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list') { return Promise.resolve(mealIngredients); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') { return Promise.resolve(mealsByIngredient); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?a=list') { return Promise.resolve(areas); }

    if (
      url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
      || url === 'https://www.themealdb.com/api/json/v1/1/random.php'
      || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977'
    ) { return Promise.resolve(oneMeal); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') { return Promise.resolve(soupMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') { return Promise.resolve(beefMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') { return Promise.resolve(breakfastMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') { return Promise.resolve(chickenMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') { return Promise.resolve(dessertMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') { return Promise.resolve(emptyMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(meals); }

    return Promise.reject(new Error('Invalid url'));
  },
});

export default fetchMeals;
