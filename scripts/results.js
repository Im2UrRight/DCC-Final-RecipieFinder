//Jonathan Ashby
//results.js
//Loads the results for search
const apiKey = '';
//const displayLargeButton = document.getElementById('display-large');
//const displaySmallButton = document.getElementById('display-grid');
const resultsContainer = document.getElementById('resultsContainer')
const loadMoreButton = document.getElementById('loadMoreButton')
let offset = 0;

//get seach query
function getQueryParam(name) {
  let urlParams = new URLSearchParams(window.location.search);
  
  return urlParams.get(name);
};
//get information from api
function searchRecipes() {
  const query = getQueryParam('query');
  // Construct the API URL with the ingredients and offset
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=20&offset=${offset}&instructionsRequired=true`;

  // Fetch data from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error('Error fetching recipe results:', error));
}
// Function to create a recipe card
function createRecipeCard(recipeData) {
  const link = document.createElement('a');
  link.href = `recipe.html?query=${encodeURIComponent(recipeData.title)}&id=${recipeData.id}`

  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipe-card');

  const image = document.createElement('img');
  image.src = recipeData.image || 'Images/unavailable.png'; // Replace with the actual image URL
  image.alt = recipeData.title || 'Image not available.';

  const dishName = document.createElement('p');
  dishName.innerHTML = recipeData.title;

  link.appendChild(image)
  link.appendChild(dishName)
  recipeCard.appendChild(link)
  return recipeCard
}

//display and populate results
function displayResults(data) {
  console.log(data);
  // Clear previous results if it's a new search
  if (offset === 0) {
    resultsContainer.textContent = '';
  }

  if (!data || !data.results || data.results.length === 0) {
    resultsContainer.innerHTML = '<p>No recipes found with the given ingredients.</p>';
  } else {
    data.results.forEach(recipe => {
      const recipeCard = createRecipeCard(recipe);
      resultsContainer.appendChild(recipeCard);
    });
  }
}

// Increment the offset and initiate another search
// function loadMore() {
//   offset += 20;
//   searchRecipes();
// }

// document.addEventListener('DOMContentLoaded', function () {
//   loadMoreButton.addEventListener('click', loadMore);
//   searchRecipes();
// });
searchRecipes();