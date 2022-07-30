import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const USER_EMAIL = "email@email.com";
const USER_PASSWORD = "1234567A";

const USER_EMAIL_WRONG = "email2email.com";
const USER_PASSWORD_WRONG = "123456";

describe('testa os botões do header', () => {
  it('Testa se o botão profile redireciona para a página de profile', () => {
    const {history} = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    waitFor(()=> screen.getByTestId("login-submit-btn").not.toBeInTheDocument(), {timeOut:400});

    expect(screen.getByTestId("page-title")).toBeInTheDocument();

    expect(screen.getByTestId("page-title")).toHaveTextContent(/Foods/i);

    const profileBtn = screen.getAllByTestId('profile-top-btn');
    userEvent.click(profileBtn[0])

    waitFor(()=> expect(pathname).toBe('/profile'));

    const email = screen.getByTestId('profile-email');
    expect(screen.getByTestId("page-title")).toHaveTextContent(/Profile/i);
    
  });
  it('Testa se o botão search renderiza a searchbar', () => {
    const {history} = renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    waitFor(()=> screen.getByTestId("login-submit-btn").not.toBeInTheDocument(), {timeOut:400});

    expect(screen.getByTestId("page-title")).toBeInTheDocument();

    expect(screen.getByTestId("page-title")).toHaveTextContent(/Foods/i);

    const searchBtn = screen.getAllByTestId('search-top-btn');
    userEvent.click(searchBtn[0])
    
  });
});
