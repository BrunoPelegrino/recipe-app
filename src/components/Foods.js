
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SeachBar from './SearchBar';
import SelectionFilter from './SelectionFilter';
import RecipeCard from './RecipeCard';
import { getMealsToState } from '../redux/actions';

const Foods = () => {
  const history = useHistory();
  const maxCards = 12;
  const dispatch = useDispatch();
  const searchBarStatus = useSelector((state) => state.reducer.isSearchBar);
  const mealsData = useSelector((state) => state.reducer.mealsData);
  const isSearch = useSelector((state) => state.reducer.isSearchFilter);
  // const mealsDataCopy = [...mealsData];
  useEffect(() => {
    dispatch(getMealsToState());
  }, []);

  return (
    <div>
      <Header title="Foods" search history={ history } />
      {
        searchBarStatus && <SeachBar />
      }
      <SelectionFilter />
      {
        mealsData && (
          <div className="flex flex-wrap items-center justify-center gap-5">
            {
              mealsData?.length === 1 && isSearch
                ? history.push(`/foods/${mealsData[0]?.idMeal}`)
                : ([...mealsData].splice(0, maxCards)
                  .map((meal, i) => (
                    <RecipeCard
                      key={ meal.idMeal }
                      idRecipe={ meal.idMeal }
                      id={ i }
                      title={ meal.strMeal }
                      image={ meal.strMealThumb }
                      isDrink={ false }
                    />
                  )))
            }
          </div>)
      }
      <Footer />
    </div>
  );
};

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.fuc,
  }),
}.isRequired;

export default Foods;
