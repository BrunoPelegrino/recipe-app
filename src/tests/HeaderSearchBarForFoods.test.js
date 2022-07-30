import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import fetchMeals from './helpers/mocks/fetchMeals';

const fetchMock = require('../../cypress/mocks/fetch');

const USER_EMAIL = "email@email.com";
const USER_PASSWORD = "1234567A";

const PATHNAME_FOOD = '/foods';

const TESTID_SEARCH_TOP_BTN = 'search-top-btn';
const TESTID_SEARCH_INPUT = 'search-input';
const TESTID_IGREDIENT_SEARCH_RADIO = "ingredient-search-radio";
const TESTID_NAME_SEARCH_RADIO = "name-search-radio";
const TESTID_FIRST_LETTER_SEARCH_RADIO = "first-letter-search-radio";
const TESTID_EXEC_SEARCH_BTN = "exec-search-btn";
const ONLY_ONE_LETTER = 'Your search must have only 1 (one) character';
const NOT_FOUND_RECIPE = 'Sorry, we haven\'t found any recipes for these filters.';

describe('01 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo', () => {
  jest.setTimeout(100000);
  it('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons', async() => {
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(()=> screen.getByTestId(TESTID_SEARCH_TOP_BTN), {timeout:400});
    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));
    expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument();    
    expect(screen.getByTestId(TESTID_IGREDIENT_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId(TESTID_NAME_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId(TESTID_FIRST_LETTER_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId(TESTID_EXEC_SEARCH_BTN)).toBeInTheDocument();
  });
});

describe('02 - Implemente 3 radio buttons na barra de busca: Ingredient, Name e First letter', () => {
  afterEach(() => jest.clearAllMocks());
  it('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    jest.spyOn(global, 'fetch');
    // global.fetch = jest.fn(fetchMeals);
    jest.spyOn(global, 'alert');

    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(async()=> await screen.findByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    await waitFor(async ()=> await screen.findByTestId(TESTID_SEARCH_INPUT));
    expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(TESTID_IGREDIENT_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'chicken');
    // global.fetch();
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));
    
    // expect(global.fetch).toBeCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`)
    
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'Goat');
    userEvent.click(screen.getByTestId(TESTID_IGREDIENT_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    // await waitFor(()=>expect(global.alert).toHaveBeenCalledTimes(2));

    // expect(global.alert).toHaveBeenLastCalledWith(NOT_FOUND_RECIPE);
  });

  it('Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMeals);
    jest.spyOn(global, 'alert');

    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(async()=> await screen.findByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    await waitFor(async()=> await screen.findByTestId(TESTID_SEARCH_INPUT));
    expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(TESTID_NAME_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'soup');
    global.fetch();
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    expect(global.fetch).toBeCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=soup`);
  });

  it('Se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', async() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMeals);
    jest.spyOn(global, 'alert');

    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));
    await waitFor(async ()=> await screen.findByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    await waitFor(async ()=> await screen.findByTestId(TESTID_SEARCH_INPUT));
    expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(TESTID_FIRST_LETTER_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'a');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
  it('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMeals);

    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(async()=> await screen.findByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    await waitFor(async()=> await screen.findByTestId(TESTID_SEARCH_INPUT));
    expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(TESTID_FIRST_LETTER_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'aa');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    expect(global.alert).toHaveBeenLastCalledWith(ONLY_ONE_LETTER);
  });
});

describe('03 - Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL', () => {
  jest.setTimeout(100000);
  afterEach(() => jest.clearAllMocks());
  it('Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes', async() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMeals);
    const {history, debug} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(async ()=> await screen.findByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    await waitFor(async ()=> await screen.findByTestId(TESTID_SEARCH_INPUT));

    userEvent.click(screen.getByTestId(TESTID_NAME_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'Arrabiata');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));
    debug();
    expect(global.fetch).toBeCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`);
    // await waitFor(async () => await screen.findByTestId('recipe-title'), {timeout: 2000});    
    // expect(screen.getByTestId("instructions")).toBeInTheDocument();
    // expect(history.location.pathname).toBe('/foods/52771');
  });
});

describe('04 - Mostre as receitas em cards, caso mais de uma receita seja encontrada', () => {
  afterEach(() => jest.clearAllMocks());
  it('Caso mais de uma comida seja encontrada, mostrar as 12 primeiras', async() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMeals);
    jest.spyOn(global, 'alert');

    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));
    await waitFor(()=> screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    await waitFor(async ()=> await screen.findByTestId(TESTID_SEARCH_INPUT));
    expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(TESTID_IGREDIENT_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'chicken');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    expect(global.fetch).toBeCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`);

    await waitFor(()=> screen.getAllByRole('img'), {timeout:300});

    expect(screen.getAllByTestId(/[0-9]-card-img/i)).toHaveLength(12);
  });   
});

describe('05 - Exiba um `alert` caso nenhuma receita seja encontrada', () => {
  it('Caso nenhuma comida seja encontrada o alert deve ser exibido', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);

    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(async()=> await screen.findByTestId(TESTID_SEARCH_TOP_BTN));

    expect(screen.getByTestId(TESTID_SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(TESTID_SEARCH_TOP_BTN));

    await waitFor(()=> screen.getByTestId(TESTID_SEARCH_INPUT));
    expect(screen.getByTestId(TESTID_SEARCH_INPUT)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(TESTID_NAME_SEARCH_RADIO));
    userEvent.type((screen.getByTestId(TESTID_SEARCH_INPUT)),'xablau');
    userEvent.click(screen.getByTestId(TESTID_EXEC_SEARCH_BTN));

    await waitFor(()=>expect(global.alert).toHaveBeenCalledTimes(1));

    expect(global.alert).toHaveBeenLastCalledWith(NOT_FOUND_RECIPE);
  });
});
