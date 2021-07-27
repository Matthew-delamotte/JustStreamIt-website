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

async function getMovieData(url) {
  const response = await fetch(url);
  return response.json();
}

/* Creation HTML */
function bestMovieImg(movie) {
  const img = document.createElement("img");
  img.src = movie.image_url;
  // img.className = "best-movie-img";
  // document.getElementById("best-movie").appendChild(img);
  document.getElementById(
    "best-movie"
  ).style.backgroundImage = `url(${movie.image_url})`;
  //   const title = document.createElement("div");
  //   title.appendChild(document.createTextNode(movie.title));
  //   title.appendChild(document.createI)
  //   document.getElementById("best-movie").appendChild(title);
}

function bestMoviesImg(movies) {
  const parent = document.getElementById("best-movies");

  for (const movie of movies) {
    const a = document.createElement("a");
    a.href = "#";

    const div = document.createElement("div");
    div.classList.add("best-movies-img");
    div.style.backgroundImage = `url(${movie.image_url})`;
    a.appendChild(div);
    parent.appendChild(a);
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
  const parent = document.getElementById("categorie-scyfi-slider");
  for (const movie of movies.results) {
    const div = document.createElement("div");
    div.classList.add("keen-slider__slide");
    div.style.backgroundImage = `url(${movie.image_url})`;
    // parent.appendChild(div);
  }

  //   const img = document.createElement("img");
  //   img.src = movie.image_url;
  //   document.getElementById(`categorie${categorie}`).appendChild(img);
  // }
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
  bestMovieImg(movies.results[0]);
  bestMoviesImg(movies.results.slice(1));
});

categorie("Sci-Fi").then();
// categorie("Fantasy").then();
// categorie("Animation").then();

function getData(categorie) {
  if (categorie == "bestMovie") {
    lstMovies("-imdb_score", "", 8).then((movies) => {
      for (const movie of movies.results) {
        getMovieData(movie.url).then((data) => {
          // console.log(data);
          let movieData = {
            image_url: data.image_url,
            title: data.title,
            genres: data.genres,
            datePublished: data.date_published,
            rated: data.rated,
            imdbScore: data.imdb_score,
            directors: data.directors,
            actors: data.actors,
            duration: data.duration,
            country: data.countries,
            boxOffice: data.metascore,
            description: data.long_description,
          };
          console.log(movieData);
        });
      }
    });
  } else if (categorie == "Sci-fi" || "Fantasy" || "Animation") {
    lstMovies("-imdb_score", categorie, 7).then((movies) => {
      for (const movie of movies.results) {
        getMovieData(movie.url).then((data) => {
          // console.log(data);
          let movieData = {
            image_url: data.image_url,
            title: data.title,
            genres: data.genres,
            datePublished: data.date_published,
            rated: data.rated,
            imdbScore: data.imdb_score,
            directors: data.directors,
            actors: data.actors,
            duration: data.duration,
            country: data.countries,
            boxOffice: data.metascore,
            description: data.long_description,
          };
          console.log(movieData);
        });
      }
    });
  } else {
    alert(err);
  }
}

getData("Animation");

//******** Modal ***********/
// // Get the modal
// let modal = document.getElementById("myModal");

// // Get the button that opens the modal
// let btn = document.getElementsByClassName("myBtn");

// // Get the <span> element that closes the modal
// let span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn[0].onclick = function () {
//   modal.style.display = "block";
// };

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
