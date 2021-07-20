/* Appel API */
async function lstMovies(sortBy, genre, pageSize = 5) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/titles?sort_by=${sortBy}&page_size=${pageSize}&genre=${genre}`
    );
    return response.json(); // .then((response) => response.json())
  } catch (err) {
    alert(err); // TypeError: failed to fetch
  }
}

/* Creation HTML */
function bestMovie(movie) {
  const img = document.createElement("img");
  img.src = movie.image_url;
  img.className = "best-movie__img";
  document.getElementById("best-movie").appendChild(img);
  //   const title = document.createElement("div");
  //   title.appendChild(document.createTextNode(movie.title));
  //   title.appendChild(document.createI)
  //   document.getElementById("best-movie").appendChild(title);
}

function bestMovies(movies) {
  for (const movie of movies) {
    const img = document.createElement("img");
    img.src = movie.image_url;
    document.getElementById("best-movies").appendChild(img);
  }
  //   for (const movie of movies) {
  //     const title = document.createElement("div");
  //     title.classList.add("movie");
  //     title.appendChild(document.createTextNode(movie.title));
  //     document.getElementById("best-movies").appendChild(title);
  //   }
}

async function categorie(categorie) {
  const movies = await lstMovies("-imdb_score", categorie, 7);

  for (const movie of movies.results) {
    const img = document.createElement("img");
    img.src = movie.image_url;
    document.getElementById(`categorie${categorie}`).appendChild(img);
  }
  //   for (const movie of movies.results) {
  //     const title = document.createElement("div");
  //     title.classList.add("movie");
  //     title.appendChild(document.createTextNode(movie.title));
  //     document.getElementById(`categorie${categorie}`).appendChild(title);
  //   }
}

// lstMovies("-imdb_score", "", 8).then((movies) => {
//   for (const movie of movies.results) {
//     console.log(movie);
//   }
// });

lstMovies("-imdb_score", "", 8).then((movies) => {
  bestMovie(movies.results[0]);
  bestMovies(movies.results.slice(1));
});

categorie("Sci-Fi").then();
categorie("Fantasy").then();
categorie("Animation").then();
