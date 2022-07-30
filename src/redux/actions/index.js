import { getDrinkDetails,
  getDrinks,
  getDrinksByCategory,
  getDrinksByFisrtLetter,
  getDrinksByIngredient,
  getDrinksCategory } from '../../services/drinksAPI';
import { getMealDetails, getMeals,
  getMealsByCategory,
  getMealsByFisrtLetter,
  getMealsByIngredient,
  getMealsCategory } from '../../services/foodsAPI';

const notFoundAlert = () => {
  global.alert('Sorry, we haven\'t found any recipes for these filters.');
};
const firstLetterError = 'Your search must have only 1 (one) character';

export const SENDMEALS = 'SENDMEALS';
export const SENDMEALSCATEGORY = 'SENDMEALSCATEGORY';
export const SENDMEALDETAILS = 'SENDMEALDETAILS';
export const SENDDRINKS = 'SENDDRINKS';
export const SENDDRINKSCATEGORYS = 'SENDDRINKSCATEGORYS';
export const SENDDRINKDETAILS = 'SENDDRINKDETAILS';
export const SENDSEARCHBARSTATUS = 'SENDSEARCHBARSTATUS';
export const SENDCHECKEDINGREDIENTS = 'SENDCHECKEDINGREDIENTS';
export const SENDFILTERTYPE = 'SENDFILTERTYPE';
export const SENDFILTERLOCAL = 'SENDFILTERLOCAL';

export const sendSearchStatus = (payload) => ({ type: SENDSEARCHBARSTATUS, payload });
export const sendCheckedIngredients = (payload) => (
  { type: SENDCHECKEDINGREDIENTS, payload });
export const sendFilterType = (payload) => ({ type: SENDFILTERTYPE, payload });
export const sendFilterLocal = (payload) => ({ type: SENDFILTERLOCAL, payload });

// Foods Thunk

export const getMealsToState = (id) => async (dispatch) => {
  const data = await getMeals(id);
  if (data.meals !== null) {
    dispatch({ type: SENDMEALS, payload: data });
  } else {
    notFoundAlert();
  }
};

export const getMealsByFisrtLetterToState = (letter) => async (dispatch) => {
  try {
    const data = await getMealsByFisrtLetter(letter);
    dispatch({ type: SENDMEALS, payload: data });
  } catch (error) {
    global.alert(firstLetterError);
  }
};

export const getMealsByIngredientToState = (ingredient) => async (dispatch) => {
  try {
    const data = await getMealsByIngredient(ingredient);
    dispatch({ type: SENDMEALS, payload: data });
  } catch (error) {
    notFoundAlert();
  }
};

export const getMealsByCategoryToState = (category) => async (dispatch) => {
  const data = await getMealsByCategory(category);

  dispatch({ type: SENDMEALS, payload: data });
};

export const getMealsCategorysToState = () => async (dispatch) => {
  const data = await getMealsCategory();
  dispatch({ type: SENDMEALSCATEGORY, payload: data });
};

export const getMealDetailsToState = (id) => async (dispatch) => {
  try {
    const data = await getMealDetails(id);
    dispatch({ type: SENDMEALDETAILS, payload: data });
  } catch (error) {
    notFoundAlert();
  }
};

// Drinks Thunks

export const getDrinksToState = (id) => async (dispatch) => {
  try {
    const data = await getDrinks(id);
    if (data.drinks !== null) {
      dispatch({ type: SENDDRINKS, payload: data });
    } else {
      notFoundAlert();
    }
  } catch (error) {
    notFoundAlert();
  }
};

export const getDrinksByIngredientToState = (ingredient) => async (dispatch) => {
  try {
    const data = await getDrinksByIngredient(ingredient);
    dispatch({ type: SENDDRINKS, payload: data });
  } catch (error) {
    notFoundAlert();
  }
};

export const getDrinksByCategoryToState = (category) => async (dispatch) => {
  const data = await getDrinksByCategory(category);
  dispatch({ type: SENDDRINKS, payload: data });
};

export const getDrinksByFisrtLetterToState = (letter) => async (dispatch) => {
  try {
    const data = await getDrinksByFisrtLetter(letter);

    dispatch({ type: SENDDRINKS, payload: data });
  } catch (error) {
    global.alert(firstLetterError);
  }
};

export const getDrinksCategorysToState = () => async (dispatch) => {
  const data = await getDrinksCategory();
  dispatch({ type: SENDDRINKSCATEGORYS, payload: data });
};

export const getDrinkDetailsToState = (id) => async (dispatch) => {
  const data = await getDrinkDetails(id);
  dispatch({ type: SENDDRINKDETAILS, payload: data });
};
