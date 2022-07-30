import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const USER_EMAIL = "email@email.com";
const USER_PASSWORD = "1234567A";

describe('testa as funcionalidades da página de receita em progresso', () => {
  it('Testa se entra na página em progresso, e pode dar check na lista', async () => {
    window.document.execCommand = jest.fn(() => true)

    const {history} = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;


    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    expect(screen.getByTestId("page-title")).toBeInTheDocument();

    expect(screen.getByTestId("page-title")).toHaveTextContent(/Foods/i);

    const recipe = await screen.findByText(/corba/i);
    userEvent.click(recipe);

    waitFor(()=> expect(history.location.pathname).toBe('/foods/52977'));

    const startBtn = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startBtn);

    waitFor(()=> expect(history.location.pathname).toBe('/foods/52977/in-progress'));

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();
    userEvent.click(finishBtn);


    const checkboxs = await screen.findAllByRole('checkbox');
    expect(checkboxs[12]).not.toBeChecked()
    userEvent.click(checkboxs[0]);
    userEvent.click(checkboxs[1]);
    userEvent.click(checkboxs[2]);
    userEvent.click(checkboxs[3]);
    userEvent.click(checkboxs[4]);
    userEvent.click(checkboxs[5]);
    userEvent.click(checkboxs[6]);
    userEvent.click(checkboxs[7]);
    userEvent.click(checkboxs[8]);
    userEvent.click(checkboxs[9]);

    history.push('/foods/52977');
    const continueBtn = await screen.findByText('Continue Recipe');
    userEvent.click(continueBtn);
    await waitFor(()=> expect(history.location.pathname).toBe('/foods/52977/in-progress'));
    const checkboxs2 = await screen.findAllByRole('checkbox');
    userEvent.click(checkboxs2[10]);
    userEvent.click(checkboxs2[11]);
    userEvent.click(checkboxs2[12]);
    userEvent.click(checkboxs2[12]);
    userEvent.click(checkboxs2[12]);
    // expect(checkboxs[12]).toBeChecked()
    await waitFor(async () => expect(await screen.findByTestId('finish-recipe-btn')).not.toBeDisabled())
    await waitFor(async () => userEvent.click(await screen.findByTestId('finish-recipe-btn')));
    
    history.push('/foods/52977');
    expect(startBtn).not.toBeInTheDocument();
    expect(screen.queryByTestId('start-recipe-btn')).not.toBeInTheDocument();
    
    history.push('/done-recipes');
    userEvent.click(screen.getByTestId('filter-by-food-btn'));
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    // userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    // await waitFor(()=> expect(pathname).toBe('/done-recipes'));
    // await waitFor(()=> expect(screen.findByTestId("page-title")).toHaveTextContent(/Done Recipes/i));
    // history.push('/foods/52977');
    // expect(await screen.findByTestId('start-recipe-btn')).not.toBeInTheDocument();
  });
});

describe('testa as funcionalidades da página de receita em progresso de drinks', () => {
  const TOTAL = 40000;
  jest.setTimeout(TOTAL);
  
  it('Testa se entra na página de drinks em progresso, e pode dar check na lista', async () => {
    const {history} = renderWithRouterAndRedux(<App />);


    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    expect(screen.getByTestId("page-title")).toBeInTheDocument();

    expect(screen.getByTestId("page-title")).toHaveTextContent(/Foods/i);
    
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    
    expect(screen.getByTestId("page-title")).toHaveTextContent(/Drinks/i);
    const drinkRecipe = await screen.findByText(/GG/i);
    userEvent.click(drinkRecipe);

    await waitFor(()=> expect(history.location.pathname).toBe('/drinks/15997'), {timeout: 5000});

    const startBtn = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startBtn);

    await waitFor(()=> expect(history.location.pathname).toBe('/drinks/15997/in-progress'));
    
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();
    userEvent.click(finishBtn);
    
    
    const checkboxs = await screen.findAllByRole('checkbox');
    expect(checkboxs[0]).not.toBeChecked()
    userEvent.click(checkboxs[0]);
    userEvent.click(checkboxs[0]);
    userEvent.click(checkboxs[0]);
    userEvent.click(checkboxs[1]);

    history.push('/drinks/15997');

    const continueBtn = await screen.findByText('Continue Recipe');
    userEvent.click(continueBtn);
    await waitFor(()=> expect(history.location.pathname).toBe('/drinks/15997/in-progress'));
    expect(checkboxs[0]).toBeChecked()
    expect(checkboxs[1]).toBeChecked()
    userEvent.click(checkboxs[2]);
    expect(checkboxs[2]).toBeChecked()
    checkboxs.forEach((check) => expect(check).toBeChecked())
    // await waitFor(async () => expect(await screen.findByTestId('finish-recipe-btn')).not.toBeDisabled())
    await waitFor(async () => userEvent.click(await screen.findByTestId('finish-recipe-btn')));
    // await waitFor(()=> expect(pathname).toBe('/done-recipes'));
    // await waitFor(()=> expect(screen.findByTestId("page-title")).toHaveTextContent(/Done Recipes/i));
    // history.push('/drinks/15997');
    
  });
});
describe('testa todas as rotas', () => {
  const TOTAL = 40000;
  jest.setTimeout(TOTAL);
  
  it('Testa todas as rotas', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    history.push('/profile')
    history.push('/done-recipes')
    history.push('/favorite-recipes')
    history.push('/drinks')
    history.push('/foods')
    history.push('/drinks/:id')
    history.push('/foods/:id')
    history.push('/drinks/:id/in-progress')
    history.push('/foods/:id/in-progress')

    
  })});