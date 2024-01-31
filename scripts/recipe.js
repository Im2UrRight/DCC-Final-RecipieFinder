//Jonathan Ashby
//results.js
//Jonathan Ashby
//results.js
const apiKey = '';

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get(name))
  return urlParams.get(name);
}

function fetchRecipe() {
  const query = getQueryParam('query');
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&instructionsRequired=true&addRecipeInformation=true`;

  // Fetch data from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayRecipe(data);
      console.log(data);
    })
    .catch(error => console.error('Error fetching recipe:', error));
}

function displayRecipe(results) {
  console.log(results)
  const recipeData = results.results[0];
  document.title = `RecipeFinder | ${recipeData.title}`;

  const image = document.getElementById('recipeImg');
  image.src = recipeData.image || 'images/unavailable.png';
  image.alt = recipeData.title;

  const name = document.getElementById('recipeTitle');
  name.innerHTML = recipeData.title;

  const description = document.getElementById('recipeDesc');
  description.innerHTML = recipeData.summary;

  const servings = document.getElementById('servings');
  servings.innerHTML = recipeData.servings;

  const totalTime = document.getElementById('totalTime');
  totalTime.innerHTML = recipeData.readyInMinutes;

  const source = document.getElementById('source');
  if (recipeData.sourceUrl) {
    source.href = recipeData.sourceUrl;
    source.innerText = recipeData.sourceName;
  } else {
    source.innerHTML = 'Source not available';
  }

  const instructions = document.getElementById('recipeInstructions');
  function populateInstructions(data) {
    if (data && data.length > 0) {
      const steps = data[0].steps;steps.forEach(step => {
        const listItem = document.createElement('li');
        listItem.textContent = `${step.step}`;
  
        instructions.appendChild(listItem);
      });
    } else {// Handle the case when analyzedInstructions is undefined or empty
      const noInstructions = document.createElement('li');
      noInstructions.textContent = 'No instructions available';
      instructions.appendChild(noInstructions);
    }
  }
  populateInstructions(recipeData.analyzedInstructions);
}

fetchRecipe();