
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SeachBar from './SearchBar';
import { getDrinksToState } from '../redux/actions';
import RecipeCard from './RecipeCard';
import SelectionFilter from './SelectionFilter';

const Drinks = () => {
  const history = useHistory();
  const maxCards = 12;
  const dispatch = useDispatch();
  const searchBarStatus = useSelector((state) => state.reducer.isSearchBar);
  const drinksData = useSelector((state) => state.reducer.drinksData);

  useEffect(() => {
    dispatch(getDrinksToState(''));
  }, []);
  return (
    <div>
      <Header title="Drinks" search />
      {
        searchBarStatus && <SeachBar />
      }
      <SelectionFilter />
      {
        drinksData && (
          <div className="flex flex-wrap items-center justify-center gap-5">
            {
              drinksData?.length === 1
                ? history.push(`/drinks/${drinksData[0]?.idDrink}`)
                : ([...drinksData]?.splice(0, maxCards)
                  .map((meal, i) => (
                    <RecipeCard
                      key={ meal.idDrink }
                      idRecipe={ meal.idDrink }
                      id={ i }
                      title={ meal.strDrink }
                      image={ meal.strDrinkThumb }
                      isDrink
                    />
                  )))
            }
          </div>
        )
      }
      <Footer />
    </div>
  );
};

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.fuc,
  }),
}.isRequired;

export default Drinks;
