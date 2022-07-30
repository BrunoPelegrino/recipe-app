import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import fetchDrinks from './helpers/mocks/fetchDrinks';

const fetchMock = require('../../cypress/mocks/fetch');

const USER_EMAIL = "email@email.com";
const USER_PASSWORD = "1234567A";

const PATHNAME_DRINKS = '/drinks';

const TESTID_SEARCH_TOP_BTN = 'search-top-btn';
const TESTID_SEARCH_INPUT = 'search-input';
const TESTID_IGREDIENT_SEARCH_RADIO = "ingredient-search-radio";
const TESTID_NAME_SEARCH_RADIO = "name-search-radio";
const TESTID_FIRST_LETTER_SEARCH_RADIO = "first-letter-search-radio";
const TESTID_EXEC_SEARCH_BTN = "exec-search-btn";
const ONLY_ONE_LETTER = 'Your search must have only 1 (one) character';
const TESTID_DRINKS = 'drinks-bottom-btn';
const TESTID_TITLE = 'page-title';
const URL_LIGTH_RUN = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=ligth rum"
const NOT_FOUND_RECIPE = 'Sorry, we haven\'t found any recipes for these filters.';

describe('01 - Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas', () => {
  afterEach(() => jest.clearAllMocks());
  jest.setTimeout(100000);
  it('Na tela de bebidas, se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async() => {
  //  jest.spyOn(global, 'fetch');
    global.alert = jest.fn();
    // global.fetch = jest.fn(fetchMock);
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    expect(screen.getByTestId(TESTID_DRINKS)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_DRINKS));
    await waitFor(()=>expect(screen.getByTestId(TESTID_TITLE)).toHaveTextContent(/drinks/i),{timeout:400});

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));
    
    await waitFor(()=>expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument(), {timeout:200});

    userEvent.click(screen.getByRole('radio', {name: /ingredient/i}));
    userEvent.type(screen.getByRole('textbox'),'gin');
    // userEvent.click(screen.getByTestId(TESTID_IGREDIENT_SEARCH_RADIO));
    // userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'gin');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));
    userEvent.click(screen.getByTestId(TESTID_IGREDIENT_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'cachaça');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    // expect(global.fetch).toHaveBeenLastCalledWith(URL_LIGTH_RUN);
  });

  it('Na tela de bebidas, se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async() => {
    jest.spyOn(global, 'fetch');
    global.alert = jest.fn();
    global.fetch = jest.fn(fetchMock);
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    expect(screen.getByTestId(TESTID_DRINKS)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_DRINKS));
    await waitFor(async ()=> await screen.findByRole('heading', {name: /drinks/i}),{timeout:400});    
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));
    
    await waitFor(()=>expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument(), {timeout:200});

    userEvent.click(screen.getByTestId(TESTID_NAME_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'gin');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    expect(global.fetch).toBeCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin`);
  });

  it('Na tela de bebidas, se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', async() => {
    jest.spyOn(global, 'fetch');
    global.alert = jest.fn();
    global.fetch = jest.fn(fetchMock);
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    expect(screen.getByTestId(TESTID_DRINKS)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_DRINKS));
    await waitFor(()=>expect(screen.getByTestId(TESTID_TITLE)).toHaveTextContent(/drinks/i),{timeout:400});
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    
    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));
    
    await waitFor(()=>expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument(), {timeout:100});

    userEvent.click(screen.getByTestId(TESTID_FIRST_LETTER_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'g');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    expect(global.fetch).toHaveBeenLastCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g`);
  });

  it('Na tela de bebidas, se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async() => {
    jest.spyOn(global, 'fetch');
    global.alert = jest.fn();
    global.fetch = jest.fn(fetchMock);
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));
    
    expect(screen.getByTestId(TESTID_DRINKS)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_DRINKS));
    await waitFor(()=>expect(screen.getByTestId(TESTID_TITLE)).toHaveTextContent(/drinks/i),{timeout:400});
    expect((global.fetch)).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));
    
    await waitFor(()=>expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument(), {timeout:100});

    userEvent.click(screen.getByTestId(TESTID_FIRST_LETTER_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'gi');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    expect(global.alert).toHaveBeenLastCalledWith(ONLY_ONE_LETTER);
  });
});

describe('02 - Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL', () => {
  jest.setTimeout(5000);
  afterEach(() => jest.clearAllMocks());
  it('Caso apenas uma bebida seja encontrada, deve-se ir para sua rota de detalhes', async() => {
    jest.spyOn(global, 'fetch');
    global.alert = jest.fn();
    global.fetch = jest.fn(fetchMock);
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(()=> screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_DRINKS)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_DRINKS));
    waitFor(()=>expect(screen.getByTestId(TESTID_TITLE)).toHaveTextContent(/drinks/i),{timeout:400});
    await waitFor(async ()=> await screen.findByRole('img', {name: /gg/i}));

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    await waitFor(()=> screen.getByTestId(TESTID_SEARCH_INPUT));
    expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(TESTID_NAME_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'Aquamarine');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    expect(global.fetch).toBeCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine`);
    await screen.findByTestId('recipe-title');    
    expect(screen.getByTestId("instructions")).toBeInTheDocument();

    expect(history.location.pathname).toBe('/drinks/178319');
  });
});

describe('03 - Mostre as receitas em cards, caso mais de uma receita seja encontrada', () => {
  afterEach(() => jest.clearAllMocks());
  
  it('Caso mais de uma bebida seja encontrada, mostrar as 12 primeiras', async () => {
    jest.spyOn(global, 'fetch');
    global.alert = jest.fn();
    global.fetch = jest.fn(fetchMock);
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(()=> screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_DRINKS)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_DRINKS));
    await waitFor(()=>expect(screen.getByTestId(TESTID_TITLE)).toHaveTextContent(/drinks/i),{timeout:400});
    await waitFor(async ()=> await screen.findByRole('img', {name: /gg/i}));
    expect((global.fetch)).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));
    
    await waitFor(()=>expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument(), {timeout:100});

    userEvent.click(screen.getByTestId(TESTID_NAME_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'gin');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    expect(global.fetch).toBeCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin`);
    await waitFor(()=> screen.getAllByRole('img'), {timeout:300});

    expect(screen.getAllByTestId(/[0-9]-card-img/i)).toHaveLength(12);
  }); 
});

describe('04 - Exiba um `alert` caso nenhuma receita seja encontrada', () => {
  afterEach(() => jest.clearAllMocks());
  it('Caso nenhuma bebida seja encontrada o alert deve ser exibido', async() => {
    jest.spyOn(global, 'fetch');
    global.alert = jest.fn();
    global.fetch = jest.fn(fetchMock);
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(()=> screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_DRINKS)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_DRINKS));
    await waitFor(()=>expect(screen.getByTestId(TESTID_TITLE)).toHaveTextContent(/drinks/i),{timeout:400});
    await waitFor(async ()=> await screen.findByRole('img', {name: /gg/i}));
    expect((global.fetch)).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));
    
    await waitFor(()=>expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument(), {timeout:100});

    userEvent.click(screen.getByTestId(TESTID_NAME_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'xablau');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    await waitFor(()=>expect(global.alert).toHaveBeenCalledTimes(1));

    expect(global.alert).toHaveBeenLastCalledWith(NOT_FOUND_RECIPE);    
  });
});
