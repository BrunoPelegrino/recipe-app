import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const USER_EMAIL = "email@email.com";
const USER_PASSWORD = "1234567A";

const USER_EMAIL_WRONG = "email2email.com";
const USER_PASSWORD_WRONG = "123456";

describe('1 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-submit-btn")).toBeInTheDocument();
  });
});

describe('2 - Desenvolva a tela de maneira que a pessoa consiga escrever seu email no input de email e sua senha no input de senha', () => {
  it('É possível escrever o email e a senha', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));
  });
});

describe('3 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido, e a senha deve tiver 6 caracteres ou menos', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL_WRONG);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD_WRONG);
    expect(screen.getByTestId("login-submit-btn")).not.toBeEnabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    expect(screen.getByTestId("login-submit-btn")).toBeEnabled();
  });  
});

/* describe('4 - Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave `user` e os tokens nas chaves `mealsToken` e `cocktailsToken`', () => {
  it('Após a submissão user, mealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    
  });
}); */


describe('5 - Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login', () => {
  it('A rota muda para a tela principal de receitas de comidas', async () => {
    const {history} = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(async ()=> await screen.findByTestId("page-title"));

    expect(screen.getByTestId("page-title")).toBeInTheDocument();

    expect(screen.getByTestId("page-title")).toHaveTextContent(/Foods/i);
  });
});