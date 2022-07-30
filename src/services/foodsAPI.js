// Requisição por nome e geral
// https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s={nome}
export const getMeals = async (name = '') => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  return response.json();
};

// Requisição por letra
// https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
// https://www.thecocktaildb.com/api/json/v1/1/search.php?f={primeira-letra}
export const getMealsByFisrtLetter = async (letter) => {
  // linhas 14-16 seria o tratamento do alert que permite a emissão do alert correto, pois, pelo que entendi temos que bloquear o retorno da api
  if (letter.length > 1) {
    return global.alert('Your search must have only 1 (one) character');
  }
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  return response.json();
};

// Requisição por igrediente
// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente}
export const getMealsByIngredient = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  return response.json();
};

// Requisição por categoria
// https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail
export const getMealsByCategory = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  return response.json();
};

// Requisição de Categorias
// https://www.themealdb.com/api/json/v1/1/list.php?c=list
// https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
export const getMealsCategory = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  return response.json();
};

// Requisição de receita
// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}
export const getMealDetails = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  return response.json();
};
