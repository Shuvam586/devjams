const apiUrl = "https://recc-api-hosting.onrender.com/reccwatched?param=";
// Add another movie input field
function addMovieInput() {
  const movieContainer = document.getElementById("movieNamesContainer");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "movieNames[]";
  input.placeholder = "Enter movie name";
  input.classList.add("input-field");
  movieContainer.appendChild(input);
}

// Add another genre input field
// function addGenreInput() {
//   const genreContainer = document.getElementById("genresContainer");
//   const input = document.createElement("input");
//   input.type = "text";
//   input.name = "genres[]";
//   input.placeholder = "Enter genre";
//   input.classList.add("input-field");
//   genreContainer.appendChild(input);
// }

// Handle form submission
document.getElementById("movieForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const movies = [];
  const genres = [];

  for (const [key, value] of formData) {
    if (key === "movieNames[]") {
      movies.push(value);
    } else if (key === "genres[]") {
      genres.push(value);
    }
  }
  const str = movies.join(',');
  window.location.replace(apiUrl+str);
});




// Call the API when the page loads
console.log("called the api");

