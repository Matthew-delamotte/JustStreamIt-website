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
function bestMovie(movie) {
  document.getElementById(
    "best-movie"
  ).style.backgroundImage = `url(${movie.image_url})`;

  const parent = document.getElementById("best-movie");

  const title = document.createElement("h2");
  title.appendChild(document.createTextNode("Meilleur Film"));
  title.setAttribute("id", "best-movie-title");
  parent.appendChild(title);

  const div = document.createElement("div");
  div.setAttribute("id", "best-movie-text");

  const bestMovieTitle = document.createElement("p");
  bestMovieTitle.appendChild(document.createTextNode(movie.title));

  const modalButton = document.createElement("button");
  div.addEventListener("click", function () {
    openModal(movie);
  });
  modalButton.appendChild(document.createTextNode("Résumé"));

  parent.appendChild(title);
  div.appendChild(bestMovieTitle);
  div.appendChild(modalButton);
  parent.appendChild(div);

  //   const title = document.createElement("div");
  //   title.appendChild(document.createTextNode(movie.title));
  //   title.appendChild(document.createI)
  //   document.getElementById("best-movie").appendChild(title);
  // const img = document.createElement("img");
  // img.src = movie.image_url;
  // img.className = "best-movie-img";
  // document.getElementById("best-movie").appendChild(img);
}

function bestMovies(movies) {
  const parent = document.getElementById("best-movies");

  const title = document.createElement("h2");
  title.appendChild(document.createTextNode("7 Meilleur films"));
  title.setAttribute("id", "best-movies-title");
  parent.appendChild(title);

  for (const movie of movies) {
    const a = document.createElement("a");
    a.href = "#";

    const div = document.createElement("div");
    div.classList.add("best-movies-img");
    // div.onclick = openModal;
    div.addEventListener("click", function () {
      openModal(movie);
    });
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
  const parent = document.getElementById(categorie);

  const title = document.createElement("h2");
  title.appendChild(document.createTextNode(`Catégorie: ${categorie}`));
  title.setAttribute("id", `${categorie}-title`);
  parent.appendChild(title);

  for (const movie of movies.results) {
    const a = document.createElement("a");
    a.href = "#";

    const div = document.createElement("div");
    div.classList.add(`categorie-${categorie}-img`);
    div.addEventListener("click", function () {
      openModal(movie);
    });
    div.style.backgroundImage = `url(${movie.image_url})`;
    a.appendChild(div);
    parent.appendChild(a);
  }
}
// const parent = document.getElementById("categorie-scyfi-slider");
// for (const movie of movies.results) {
//   const div = document.createElement("div");
//   div.classList.add("keen-slider__slide");
//   div.style.backgroundImage = `url(${movie.image_url})`;
//   // parent.appendChild(div);
// }

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
// }

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

async function openModal(movie) {
  const detail = await getMovieData(movie.url);
  const oldModal = document.getElementById("myModal");

  if (oldModal) {
    document.body.removeChild(oldModal);
  }

  // const modal = document.createElement("div");
  // modal.classList.add("movie-info-modal");
  // modal.setAttribute("id", "movie-info-modal");

  const myModal = document.createElement("div");
  myModal.classList.add("modal");
  myModal.setAttribute("id", "myModal");

  const content = document.createElement("div");
  content.classList.add("modal-content");

  const span = document.createElement("span");
  span.classList.add("close");
  span.appendChild(document.createTextNode("x"));

  const img = document.createElement("img");
  img.classList.add("modal-content__img");
  img.src = detail.image_url;

  const title = document.createElement("h3");
  title.classList.add("modal-content__title");
  title.appendChild(document.createTextNode(detail.title));

  const genres = document.createElement("div");
  genres.classList.add("modal-content__genres");
  genres.appendChild(document.createTextNode(detail.genres));

  const datePublished = document.createElement("div");
  datePublished.classList.add("modal-content__date-published");
  datePublished.appendChild(document.createTextNode(detail.date_published));

  const rated = document.createElement("div");
  rated.classList.add("modal-content__rated");
  rated.appendChild(document.createTextNode(detail.rated));

  const scoreImdb = document.createElement("div");
  scoreImdb.classList.add("modal-content__scoreImdb");
  scoreImdb.appendChild(document.createTextNode(detail.scoreImdb));

  const director = document.createElement("div");
  director.classList.add("modal-content__director");
  director.appendChild(document.createTextNode(detail.director));

  const actors = document.createElement("div");
  actors.classList.add("modal-content__actors");
  actors.appendChild(document.createTextNode(detail.actors));

  const duration = document.createElement("div");
  duration.classList.add("modal-content__duration");
  duration.appendChild(document.createTextNode(detail.duration));

  const countries = document.createElement("div");
  countries.classList.add("modal-content__countries");
  countries.appendChild(document.createTextNode(detail.countries));

  const boxOffice = document.createElement("div");
  boxOffice.classList.add("modal-content__box-office");
  boxOffice.appendChild(document.createTextNode(detail.worldwide_gross_income));

  const resume = document.createElement("div");
  resume.classList.add("modal-content__resume");
  resume.appendChild(document.createTextNode("résumé :"));

  const resumeText = document.createElement("div");
  resumeText.classList.add("modal-content__resume-text");
  resumeText.appendChild(document.createTextNode(detail.long_description));

  // modal.appendChild(myModal);
  myModal.appendChild(content);
  content.appendChild(span);
  content.appendChild(img);
  content.appendChild(title);
  content.appendChild(genres);
  content.appendChild(datePublished);
  content.appendChild(rated);
  content.appendChild(scoreImdb);
  content.appendChild(director);
  content.appendChild(actors);
  content.appendChild(duration);
  content.appendChild(countries);
  content.appendChild(boxOffice);
  content.appendChild(resume);
  content.appendChild(resumeText);

  myModal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    myModal.style.display = "none";
  };
  document.body.appendChild(myModal);
}

// console.log(getData("bestMovies"));
// getData("bestMovies");

//******** Modal ***********

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  let openModal = document.getElementById("myModal");
  if (event.target == openModal) {
    openModal.style.display = "none";
  }
};
