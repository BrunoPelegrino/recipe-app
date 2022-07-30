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


describe('01 - Realize uma request para a API passando o `id` da receita que deve estar disponível nos parâmetros da URL',()=>{
  it('Verifica se a requisição para a API de comidas foi realizada', async() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
    const {history} =renderWithRouterAndRedux(<App />);

    userEvent.type((screen.getByTestId("email-input")), USER_EMAIL);
    userEvent.type((screen.getByTestId("password-input")), USER_PASSWORD);
    userEvent.click(screen.getByTestId("login-submit-btn"));

    await waitFor(async()=> await screen.findAllByTestId(TESTID_IMG_CARD), {timeout:300});
    expect(screen.getByTestId(TESTID_TITLE)).toHaveTextContent(/foods/i);
    expect(screen.getAllByTestId(TESTID_IMG_CARD)).toHaveLength(12);

    userEvent.click(screen.getAllByTestId(TESTID_IMG_CARD)[0]);

    await waitFor(async()=> await screen.findByRole('img', {name: /imagerecipe/i}), {timeout:300});
    expect(screen.getByTestId(TESTID_IMG_RECIPE)).toBeInTheDocument();
    expect(screen.getByTestId(TESTID_TITLE_RECIPE)).toHaveTextContent(/Spicy Arrabiata Penne/i);    
    expect(screen.getByRole('img', {name: /shareicon/i})).toBeInTheDocument();
    expect(screen.getByRole('img', {name: /blackhearticon/i})).toBeInTheDocument();
    expect(screen.getByTestId("recipe-category")).toHaveTextContent(/Vegetarian/i);
    expect(screen.getByTestId("instructions")).toHaveTextContent(/Bring a large pot of water to a boil/i);
    expect(screen.getAllByRole('heading',{level:2})[1]).toHaveTextContent(/Ingredients/i);
    expect(screen.getAllByRole('listitem')).toHaveLength(9);
    expect(screen.getByTestId("start-recipe-btn")).toHaveTextContent(/Start Recipe/i);
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
   
    await waitFor(async()=> await screen.findAllByTestId(TESTID_IMG_CARD), {timeout:500});
    expect(screen.getAllByTestId(TESTID_IMG_CARD)).toHaveLength(12);

    userEvent.click(screen.getAllByTestId(TESTID_IMG_CARD)[0]);

    await waitFor(async()=> await screen.findByRole('img', {name: /imagerecipe/i}), {timeout:300});
    expect(screen.getByTestId(TESTID_IMG_RECIPE)).toBeInTheDocument();
    expect(screen.getByTestId(TESTID_TITLE_RECIPE)).toHaveTextContent(/GG/i);
    expect(screen.getByRole('img', {name: /shareicon/i})).toBeInTheDocument();
    expect(screen.getByRole('img', {name: /blackhearticon/i})).toBeInTheDocument();
    expect(screen.getByTestId("recipe-category")).toHaveTextContent(/Optional alcohol/i);
    expect(screen.getByTestId("instructions")).toHaveTextContent(/Pour the Galliano liqueur over ice./i);
    expect(screen.getAllByRole('heading',{level:2})[1]).toHaveTextContent(/Ingredients/i);
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByTestId("start-recipe-btn")).toHaveTextContent(/Start Recipe/i);
  });
});

/* describe('02 - Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes seguidos pelas quantidades, instruções, um vídeo do youtube \"embedado\" e recomendações', () => {
  it('Verifica se os elementos descritos no protótipo existem na tela de detalhes de comida', () => {
    
  });

  it('A tela de comida possui todos os atributos data-testid', () => {
    
  });

  it('Verifica se os elementos descritos no protótipo existem na tela de detalhes de bebida', () => {
    
  });

  it('A tela de bebidas possui todos os atributos data-testid', () => {
    
  });

});

describe('03 - Implemente as recomendações. Para receitas de comida, a recomendação deverá ser bebida, já para as receitas de bebida a recomendação deverá ser comida', () => {
  it('Verifica se a requisição para a API de bebidas foi realizada', () => {
    
  });

  it('Verifica se a requisição para a API de comidas foi realizada', () => {
    
  });
});

describe('04 - Implemente os 6 cards de recomendação, mostrando apenas 2. O scroll é horizontal, similar a um `carousel`', () => {
  it('Verifica se existem todas as recomendações na tela de detalhes de uma comida', () => {
    
  });

  it('Verifica se existem todas as recomendações na tela de detalhes de uma bebida', () => {
    
  });
});
describe('05 - Desenvolva um botão de nome \"Start Recipe\" que deve ficar fixo na parte de baixo da tela o tempo todo', () => {
  it('Verifica posicionamento do botão na tela de detalhes de comida', () => {
    
  });

  it('Verifica posicionamento do botão na tela de detalhes de bebida', () => {
    
  });
});

describe('06 - Implemente a solução de forma que, caso a receita já tenha sido feita, o botão \"Start Recipe\" desapareça', () => {
  it('Verifica se botão de iniciar receita não é visível na tela de detalhes de uma comida', () => {
    
  });

  it('Verifica se botão de iniciar receita não é visível na tela de detalhes de uma bebida', () => {
    
  });

  it('Verifica a cobertura de 45% da Tela de Detalhes da Receita', () => {
    
  });
});

describe('07 - Implemente a solução de modo que, caso a receita tenha sido iniciada mas não finalizada, o texto do botão deve ser \"Continue Recipe\"', () => {
  it('Verifica botão de "Continue Recipe" na tela de detalhes de uma comida', () => {
    
  });

  it('Verifica botão de "Continue Recipe" na tela de detalhes de uma bebida', () => {
    
  });
});

describe('08 - Redirecione a pessoa usuária caso o botão \"Start Recipe\" seja clicado, a rota deve mudar para a tela de receita em progresso', () => {
  it('Redireciona para tela de receita da comida em progresso', () => {
    
  });

  it('Redireciona para tela de receita da bebida em progresso', () => {
    
  });
});

describe('09 - Implemente um botão de compartilhar e um de favoritar a receita', () => {
  it('Verifica se os botões estão disponíveis na tela de detalhes de uma comida', () => {
    
  });

  it('Verifica se os botões estão disponíveis na tela de detalhes de uma bebida', () => {
    
  });
});

describe('09 - Implemente a solução de forma que, ao clicar no botão de compartilhar, o link da receita dentro do app deve ser copiado para o clipboard e uma mensagem avisando que o link foi copiado deve aparecer', () => {
  it('Verifica a mensagem "Link copied!" e se o link da receita da comida foi copiado para o clipboard', () => {
    
  });

  it('Verifica a mensagem "Link copied!" e se o link da receita da bebida foi copiado para o clipboard', () => {
  });
});

describe('10 - Salve as receitas favoritas no `localStorage` na chave `favoriteRecipes`', () => {
  it('Verifica se após favoritar receita de uma comida, ela é salva corretamente no localStorage', () => {
    
  });

  it('Verifica se após favoritar receita de uma bebida, ela é salva corretamente no localStorage', () => {
    
  });
});

describe('11 - Implemente o ícone do coração (favorito) de modo que: deve vir preenchido caso a receita esteja favoritada e \"despreenchido\" caso contrário', () => {
  it('Verifica se a comida favoritada vem com o coração preenchido', () => {
    
  });

  it('Verifica se a comida não favoritada vem com o coração "despreenchido"', () => {
    
  });

  it('Verifica se a bebida favoritada vem com o coração preenchido', () => {
    
  });

  it('Verifica se a bebida não favoritada vem com o coração "despreenchido"', () => {
  });
});

describe('12 - Implemente a lógica no botão de favoritar. Caso seja clicado, o ícone do coração deve mudar seu estado atual, caso esteja preenchido deve mudar para \"despreenchido\" e vice-versa', () => {
  it('Favorita a comida', () => {
    
  });

  it('Desfavorita a comida', () => {
    
  });

  it('Favorita a bebida', () => {
    
  });

  it('Desfavorita a bebida', () => {
    
  });
}); */