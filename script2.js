// Form submission handling
document.getElementById("movieForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const movieTags = Array.from(
    document.querySelectorAll("#movieTagsContainer .tags .tag")
  ).map((tag) => tag.firstChild.textContent);

  const movieIDs = [];

  for (movie of movieTags) {
    var result = await makeApiCallForImdbIDSearch(movie);
    // console.log(result)
    // result = result.json()
    movieIDs.push(result.Search[0].imdbID);
  }

  console.log(movieIDs);

  // Wait for all API calls to complete before logging the responses array
  const megaParam = movieIDs.join(',');

  console.log(megaParam);
  await makeApiCallForDJapi(megaParam).then((data) => {
    //   data = data.json()
      console.log('window will open');
      window.open('https://www.imdb.com/title/'+data.recommended);
      console.log('window has opened');
    });
  
});
// api bs idk 
async function makeApiCallForImdb(param) {
  return fetch(`http://www.omdbapi.com/?i=${param}&apikey=a0567a93`)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

async function makeApiCallForImdbIDSearch(param) {
    return fetch(`http://www.omdbapi.com/?s=${param}&apikey=a0567a93`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }

async function makeApiCallForDJapi(param) {
    // return fetch(`https://recc-api-hosting.onrender.com/reccwatched?param=${param}`)
    return fetch(`https://recc-api-hosting.onrender.com/reccwatched?param=${param}`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }

// Function to create a tag in the container
function createTag(container, text) {
  const tag = document.createElement("div");
  tag.className = "tag";
  tag.textContent = text;

  const removeTag = document.createElement("span");
  removeTag.className = "remove-tag";
  removeTag.textContent = "x";
  removeTag.onclick = () => container.removeChild(tag);

  tag.appendChild(removeTag);
  document.querySelector(".tags").appendChild(tag);
}

// Function to handle input behavior (Enter for tags, space for regular space)
function handleInput(containerId, inputId) {
  const input = document.getElementById(inputId);
  const container = document.getElementById(containerId);

  input.addEventListener("keydown", function (e) {
    // If Enter is pressed and text is selected, create a tag
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input.value.trim();
      if (value !== "" && input.selectionStart !== input.selectionEnd) {
          createTag(container, value);
          input.value = ""; // Clear input for next word
        }
    }
    // Allow normal space input
    else if (e.key === " ") {
      // Allow typing spaces for regular word separation
    }
});
}
// // Apply tag functionality to both movie names and genres
handleInput("movieTagsContainer", "movieInput");


