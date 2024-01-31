//Jonathan Ashby
//script.js
//general scripts for the entire site
const searchButtons = document.querySelectorAll('.search-btn');

//Search
searchButtons.forEach(button => {
  button.addEventListener('click', () => {
    const inputId = button.previousElementSibling.id;
    const query = document.getElementById(inputId).value;
    // Perform the search
    if(query !== null && query !== "") {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  })
})
//autocomplete