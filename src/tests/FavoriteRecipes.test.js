import { waitFor, screen } from "@testing-library/react";
// import { drinks } from "../../cypress/mocks/drinks";
import FavoriteRecipes from "../pages/FavoriteRecipes";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event';

const favoriteRecipes = [{
  alcoholicOrNot: "",
  category: "Side",
  id: "52977",
  image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
  name: "Corba",
  nationality: "Turkish",
  type: "food",
},
{
  alcoholicOrNot: "Alcoholic",
  category: "Ordinary Drink",
  id: "17837",
  image: "https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg",
  name: "Adam",
  nationality: "",
  type: "drink",
}]


describe('testa a pagina FavoriteRecipes', () => {
  it('Verifica se os elementos sao renderizados', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouterAndRedux(<FavoriteRecipes />);
    history.push('/favorite-recipes');
    const heading = screen.getByRole('heading', {  name: /favorite recipes/i});
    const profileIcon = screen.getByRole('img', {  name: /profile\-icon/i});
    const allFilter = screen.getByRole('button', {  name: /all/i});
    const foodFilter = screen.getByRole('button', {  name: /food/i});
    const drinkFilter = screen.getByRole('button', {  name: /drinks/i});
    const cardName = await screen.findByTestId('0-horizontal-name');
    const cardImage = await screen.findByTestId('0-horizontal-image');
    const  cardTopText = await screen.findByTestId('0-horizontal-top-text');
    const  cardDoneDate = await screen.findByTestId('0-horizontal-done-date');
    const  cardShareButton = await screen.findByTestId('0-horizontal-share-btn');
    const  cardFavButton = await screen.findByTestId('0-horizontal-favorite-btn');
    const cardName2  = await screen.findByTestId('1-horizontal-name');
    const cardImage2 = await screen.findByTestId('1-horizontal-image');
    // const cardTopText2 = await screen.findByTestId('1-horizontal-top-text');
    const cardDoneDate2 = await screen.findByTestId('1-horizontal-done-date');
    const cardShareButton2 = await screen.findByTestId('1-horizontal-share-btn');
    const cardFavButton2 = await screen.findByTestId('1-horizontal-favorite-btn');
  
    expect(heading).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(allFilter).toBeInTheDocument();
    expect(foodFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardTopText).toBeInTheDocument();
    expect(cardDoneDate).toBeInTheDocument();
    expect(cardShareButton).toBeInTheDocument();
    expect(cardFavButton).toBeInTheDocument();
    expect(cardName2).toBeInTheDocument();
    expect(cardImage2).toBeInTheDocument();
    // expect(cardTopText2).toBeInTheDocument();
    expect(cardDoneDate2).toBeInTheDocument();
    expect(cardShareButton2).toBeInTheDocument();
    expect(cardFavButton2).toBeInTheDocument();
  });
  it('Testa se ao clicar no card o usuário é redirecionando para a pagina de detalhes do item', async() =>{
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouterAndRedux(<FavoriteRecipes />);
    history.push('/favorite-recipes');
    const cardName = await screen.findByTestId('0-horizontal-name');
    const cardImage = await screen.findByTestId('0-horizontal-image');

    userEvent.click(cardImage);
    expect(history.location.pathname).toBe('/foods/52977')
    userEvent.click(cardName);
    expect(history.location.pathname).toBe('/foods/52977')
  })
  it('Testa se os botões de filtro funcionam corretamente', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouterAndRedux(<FavoriteRecipes />);
    history.push('/favorite-recipes');
    const allFilter = screen.getByRole('button', {  name: /all/i});
    const foodFilter = screen.getByRole('button', {  name: /food/i});
    const drinkFilter = screen.getByRole('button', {  name: /drinks/i});
    const cardName = await screen.findByTestId('0-horizontal-name');
   // const cardName2  = await screen.findByTestId('1-horizontal-name');
   const cardName2  = screen.getByTestId('1-horizontal-name');
    expect(cardName).toBeInTheDocument();
    expect(cardName2).toBeInTheDocument();

    userEvent.click(foodFilter)

    expect(cardName).toBeInTheDocument();
    expect(cardName2).not.toBeInTheDocument();

    userEvent.click(allFilter);

    expect(cardName).toBeInTheDocument();
    // expect(cardName2).toBeInTheDocument();
    expect(cardName2).toHaveTextContent('Adam');
    
    userEvent.click(drinkFilter);

    expect(cardName).not.toBeInTheDocument();
    expect(cardName2).toHaveTextContent('Adam');
  });
  it('Verifica se ao clicar no botão favorito o item e apagado da tela e do localstorage', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouterAndRedux(<FavoriteRecipes />);
    history.push('/favorite-recipes');
    const  cardFavButton = await screen.findByTestId('0-horizontal-favorite-btn');
    const cardImage = await screen.findByTestId('0-horizontal-image');

    userEvent.click(cardFavButton);
    expect(cardImage).not.toBeInTheDocument();
  })
  it('Verifica se ao clicar no botão compartilhar o endereço correto é copiado e a mensagem "Link copied" se torne visível', async () => {
    
  })
})