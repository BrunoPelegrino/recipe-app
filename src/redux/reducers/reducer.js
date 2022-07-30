import { SENDMEALS,
  SENDMEALSCATEGORY,
  SENDMEALDETAILS,
  SENDDRINKS,
  SENDDRINKSCATEGORYS,
  SENDDRINKDETAILS,
  SENDSEARCHBARSTATUS,
  SENDCHECKEDINGREDIENTS,
  SENDFILTERTYPE,
  SENDFILTERLOCAL,
} from '../actions';

const INITIAL_STATE = {
  mealsData: [],
  drinksData: [],
  mealsCategorys: [],
  drinksCategorys: [],
  mealDetails: [],
  drinkDetails: [],
  isSearchBar: false,
  checkedIngredients: 0,
  filterType: '',
  isSearchFilter: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SENDMEALS:
    return {
      ...state,
      mealsData: action.payload.meals,
    };
  case SENDMEALSCATEGORY:
    return {
      ...state,
      mealsCategorys: action.payload.meals,
    };
  case SENDMEALDETAILS:
    return {
      ...state,
      mealDetails: action.payload.meals,
    };
  case SENDDRINKS:
    return {
      ...state,
      drinksData: action.payload.drinks,
    };
  case SENDDRINKSCATEGORYS:
    return {
      ...state,
      drinksCategorys: action.payload.drinks,
    };
  case SENDDRINKDETAILS:
    return {
      ...state,
      drinkDetails: action.payload.drinks,
    };
  case SENDSEARCHBARSTATUS:
    return {
      ...state,
      isSearchBar: !state.isSearchBar,
    };
  case SENDCHECKEDINGREDIENTS:
    return {
      ...state,
      checkedIngredients: action.payload,
    };
  case SENDFILTERTYPE:
    return { ...state, filterType: action.payload };
  case SENDFILTERLOCAL:
    return { ...state, isSearchFilter: action.payload };
  default:
    return state;
  }
};

export default reducer;
