import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';


describe('01 - Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria e um botão de compartilhar e um de favoritar a receita', () => {
    it('A tela Cover deve possuir todos os atributos data-testid', async () => {
      const { history } =  renderWithRouterAndRedux(<App />);

      history.push("/foods/52795");

      await waitFor(() => expect(screen.getByTestId("recipe-photo")).toBeInTheDocument());
      expect(screen.getByTestId("recipe-title")).toBeInTheDocument();
      expect(screen.getByTestId("recipe-category")).toBeInTheDocument();
      expect(screen.getByTestId("share-btn")).toBeInTheDocument();
      expect(screen.getByTestId("favorite-btn")).toBeInTheDocument();
    });
  });

  describe('02 - Implemente a solução de forma que, ao clicar no botão de compartilhar, o link da receita dentro do app deve ser copiado para o clipboard e uma mensagem avisando que o link foi copiado deve aparecer', () => {
    it('A mensagem "Link copied!" e se o link da receita da comida foi copiado para o clipboard.', async () => {
     window.document.execCommand = jest.fn(() => true);

      const { history } =  renderWithRouterAndRedux(<App />);

      history.push("/foods/52795");

      await waitFor(async () => expect(await screen.findByTestId("recipe-title")).toBeInTheDocument());

      const shareBtn = await screen.findByTestId("share-btn");

      expect(shareBtn).toBeInTheDocument();

       userEvent.click(shareBtn);

       await waitFor(() =>  expect(screen.getByText(/link copied!/i)).toBeInTheDocument()); 

    });

    it('A mensagem "Link copied!" e se o link da receita da bebida foi copiado para o clipboard.', async () => {
        window.document.execCommand = jest.fn(() => true);

        const { history } =  renderWithRouterAndRedux(<App />);
  
        history.push("/drinks/15997");
  
        await waitFor(async () => expect(await screen.findByTestId("recipe-title")).toBeInTheDocument());

        const shareBtn = await screen.findByTestId("share-btn");
  
        expect(shareBtn).toBeInTheDocument();
  
  
        userEvent.click(shareBtn);
  
        await waitFor(() =>  expect(screen.getByText(/link copied!/i)).toBeInTheDocument()); 
      });
  });

  describe('03 - Salve as receitas favoritas no localStorage na chave favoriteRecipes', () => {
    it('Verifica se após favoritar a receita de uma comida, ela é salva corretamente no localStorage', async () => {
      const { history } =  renderWithRouterAndRedux(<App />);

      history.push("/foods/52795");

      await waitFor(async () => expect(await screen.findByTestId("recipe-title")).toBeInTheDocument());

      expect(screen.getByTestId("favorite-btn")).toBeInTheDocument();

      await waitFor(() => userEvent.click(screen.getByTestId("favorite-btn")));

      expect(screen.getByAltText("blackHeartIcon")).toBeInTheDocument();

      await waitFor(() => userEvent.click(screen.getByTestId("favorite-btn")));

    });

    it('Verifica se após favoritar a receita de uma bebida, ela é salva corretamente no localStorage', async () => {
        const { history } =  renderWithRouterAndRedux(<App />);
  
        history.push("/drinks/15997");
  
        await waitFor(async () => expect(await screen.findByTestId("recipe-title")).toBeInTheDocument());
  
        expect(screen.getByTestId("favorite-btn")).toBeInTheDocument();
  
        await waitFor(() => userEvent.click(screen.getByTestId("favorite-btn")));
  
        expect(screen.getByAltText("blackHeartIcon")).toBeInTheDocument();

        await waitFor(() => userEvent.click(screen.getByTestId("favorite-btn")));
      });
  });

  