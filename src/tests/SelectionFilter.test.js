import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const fetchMock = require('../../cypress/mocks/fetch');

const USER_EMAIL = "email@email.com";
const USER_PASSWORD = "1234567A";

const PATHNAME_FOOD = '/foods';
const PATHNAME_DRINKS = '/drinks';
const TESTID_DRINKS = 'drinks-bottom-btn'; 
const TESTID_TITLE = 'page-title';
const TESTID_TITLE_RECIPE = "recipe-title";
const TESTID_IMG_RECIPE = "recipe-photo";
const TESTID_IMG_CARD = /[0-9]-card-img/i;
const TESTID_NAME_CARD = /[0-9]-card-name/i;
const TESTID_BUTTON_ALL_CATEGORY = /all-category-filter/i;


describe('Testa se há os filtros por Categoria e eles fazem as devidas requisições',()=>{
  it('Verifica se a requisição para a API de comidas foi realizada', async() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(async()=> await screen.findAllByTestId(TESTID_IMG_CARD), {timeout:300});

    expect(screen.getByTestId(TESTID_BUTTON_ALL_CATEGORY)).toBeInTheDocument();

    expect(history.location.pathname).toBe('/foods');

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(screen.getByTestId(/Beef-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Breakfast-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Chicken-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Dessert-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Goat-category-filter/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(/Beef-category-filter/i));   
    await waitFor(async()=> await screen.findAllByTestId(TESTID_IMG_CARD), {timeout:300});
    expect(screen.getAllByTestId(TESTID_NAME_CARD)[0]).toHaveTextContent(/Beef and Mustard Pie/i);

    userEvent.click(screen.getByTestId(/Beef-category-filter/i));
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    userEvent.click(screen.getByTestId(/Goat-category-filter/i));
    await waitFor(async()=> await screen.findAllByTestId(TESTID_IMG_CARD), {timeout:300});
    expect(screen.getAllByTestId(TESTID_NAME_CARD)).toHaveLength(1);
    expect(screen.getByTestId(TESTID_NAME_CARD)).toHaveTextContent(/[Mbuzi Choma (Roasted Goat)]/i);

    userEvent.click(screen.getByTestId(TESTID_BUTTON_ALL_CATEGORY));
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    
  });
 it('Verifica se a requisição para a API de bebidas foi realizada', async() => {
  jest.spyOn(global, 'fetch');
  global.fetch = jest.fn(fetchMock);
  const {history} =renderWithRouterAndRedux(<App />);

  userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
  userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
  userEvent.click(screen.getByTestId("login-submit-btn"));

  expect(screen.getByTestId(TESTID_DRINKS)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(TESTID_DRINKS));

  await waitFor(()=>expect(screen.getByTestId(TESTID_TITLE)).toHaveTextContent(/drinks/i),{timeout:400});

  await waitFor(async()=> await screen.findAllByTestId(TESTID_IMG_CARD), {timeout:300});

  expect(screen.getByTestId(TESTID_BUTTON_ALL_CATEGORY)).toBeInTheDocument();

  expect(history.location.pathname).toBe('/drinks');

  expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  expect(screen.getByTestId(/Ordinary Drink/i)).toBeInTheDocument();
  expect(screen.getByTestId(/Cocktail/i)).toBeInTheDocument();
  expect(screen.getByTestId(/Shake/i)).toBeInTheDocument();
  expect(screen.getByTestId(/Other\/Unknown/i)).toBeInTheDocument();
  expect(screen.getByTestId(/Cocoa/i)).toBeInTheDocument();

  userEvent.click(screen.getByTestId(/shake/i));   
  await waitFor(async()=> await screen.findAllByTestId(TESTID_IMG_CARD), {timeout:300});
  expect(screen.getAllByTestId(TESTID_NAME_CARD)[0]).toHaveTextContent(/151 Florida Bushwacker/i);

  userEvent.click(screen.getByTestId(/shake/i));
  expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  userEvent.click(screen.getByTestId(TESTID_BUTTON_ALL_CATEGORY));
  expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
});