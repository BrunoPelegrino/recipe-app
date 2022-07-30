import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const USER_EMAIL = "email@email.com";
const USER_PASSWORD = "1234567A";

//Acesso ao 'localStorage'
const localStorageMock = (function() {
  let store = {}

  return {
    getItem: function(key) {
      return store[key] || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    removeItem: function(key) {
      delete store[key]
    },
    clear: function() {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('01 - Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo', () => {
    it('A tela Profile deve possuir todos os atributos data-testid', () => {
      const { history } =  renderWithRouterAndRedux(<App />);

      userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
      userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
      userEvent.click(screen.getByTestId("login-submit-btn"));

      history.push("/profile");

      expect(screen.getByTestId("profile-email")).toBeInTheDocument();
      expect(screen.getByTestId("profile-done-btn")).toBeInTheDocument();
      expect(screen.getByTestId("profile-favorite-btn")).toBeInTheDocument();
      expect(screen.getByTestId("profile-logout-btn")).toBeInTheDocument();
    });
  });

  describe('02 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível', () => {
    it('Verifica se o e-mail armazenado em localStorage está visível.', () => {
      const { history } =  renderWithRouterAndRedux(<App />);

      userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
      userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
      userEvent.click(screen.getByTestId("login-submit-btn"));

      history.push("/profile");

      expect(screen.getByTestId("profile-email")).toBeInTheDocument(); 

    });
  });

  describe('03 - Implemente 3 botões: um de nome "Done Recipes", um de nome "Favorite Recipes" e um de nome "Logout"', () => {
    it('Verifica se Se a tela contêm todos os 3 botões.', () => {
      const { history } =  renderWithRouterAndRedux(<App />);

      userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
      userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
      userEvent.click(screen.getByTestId("login-submit-btn"));

      history.push("/profile");

      expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
      expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
      expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
      
    });
  });

  describe('04 - Redirecione a pessoa usuária que, ao clicar no botão de "Done Recipes", a rota deve mudar para a tela de receitas feitas', () => {
    it('Verifica se Se a tela contêm todos os 3 botões.', () => {
      const { history } =  renderWithRouterAndRedux(<App />);
      const { pathname } = history.location;

      userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
      userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
      userEvent.click(screen.getByTestId("login-submit-btn"));

      history.push("/profile");

      userEvent.click(screen.getByTestId('profile-done-btn'));
      waitFor(() => expect(pathname).toBe('/done-recipes')) ;
      expect(screen.getByTestId('page-title')).toHaveTextContent(/done recipes/i);  
    })
  });

  describe('05 - Redirecione a pessoa usuária que, ao clicar no botão de "Favorite Recipes", a rota deve mudar para a tela de receitas favoritas', () => {
    it('Verifica se redireciona para a rota correta..', () => {
      const { history } =  renderWithRouterAndRedux(<App />);
      const { pathname } = history.location;

      userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
      userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
      userEvent.click(screen.getByTestId("login-submit-btn"));

      history.push("/profile");

      userEvent.click(screen.getByTestId('profile-favorite-btn'));
      waitFor(() => expect(pathname).toBe('/favorite-recipes'));
      expect(screen.getByTestId('page-title')).toHaveTextContent(/favorite recipes/i);  
    });
    });

  describe('06 - Redirecione a pessoa usuária que ao clicar no botão de "Logout", o localStorage deve ser limpo e a rota deve mudar para a tela de login', () => {
    it('Verifica se limpa todas as chaves da localStorage', () => {
      const { history } =  renderWithRouterAndRedux(<App />);

      userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
      userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
      userEvent.click(screen.getByTestId("login-submit-btn"));

      history.push("/profile");

      const spyLStoRemove = jest.spyOn(localStorage, 'removeItem')

      userEvent.click(screen.getByTestId('profile-logout-btn'));
      expect(spyLStoRemove).toHaveBeenCalled(); 
    });

    it('Verifica se a rota muda para a tela de login', () => {
      const { history } =  renderWithRouterAndRedux(<App />);
      const { pathname } = history.location;

      userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
      userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
      userEvent.click(screen.getByTestId("login-submit-btn"));

      history.push("/profile");

      userEvent.click(screen.getByTestId('profile-logout-btn'));
      waitFor(() => expect(pathname).toBe('/profile'));
      expect(screen.getByTestId("email-input")).toBeInTheDocument(); 
    });
    });


  