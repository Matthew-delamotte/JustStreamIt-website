// ******************* Carousel *********************
let slider = new KeenSlider("#my-keen-slider", {
  created: function (instance) {
    document
      .getElementById("arrow-left")
      .addEventListener("click", function () {
        instance.prev();
      });

    document
      .getElementById("arrow-right")
      .addEventListener("click", function () {
        instance.next();
      });
    let dots_wrapper = document.getElementById("dots");
    let slides = document.querySelectorAll(".keen-slider__slide");
    slides.forEach(function (t, idx) {
      let dot = document.createElement("button");
      dot.classList.add("dot");
      dots_wrapper.appendChild(dot);
      dot.addEventListener("click", function () {
        instance.moveToSlide(idx);
      });
    });
    updateClasses(instance);
  },
  slideChanged(instance) {
    updateClasses(instance);
  },
});

function updateClasses(instance) {
  let slide = instance.details().relativeSlide;
  let arrowLeft = document.getElementById("arrow-left");
  let arrowRight = document.getElementById("arrow-right");
  slide === 0
    ? arrowLeft.classList.add("arrow--disabled")
    : arrowLeft.classList.remove("arrow--disabled");
  slide === instance.details().size - 1
    ? arrowRight.classList.add("arrow--disabled")
    : arrowRight.classList.remove("arrow--disabled");

  let dots = document.querySelectorAll(".dot");
  dots.forEach(function (dot, idx) {
    idx === slide
      ? dot.classList.add("dot--active")
      : dot.classList.remove("dot--active");
  });
}

// ****************** fenetre modal ********************
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

function test() {
  console.log("test");
}

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const quote = document.getElementById("quote");

const getQuote = () => {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      console.log(`${data.content} —${data.author}`);
      quote.innerHTML = `${data.content} — ${data.author}`;
    });

  fetch("https://picsum.photos/1600/1000").then((response) => {
    document.getElementById("pic").innerHTML = `<img src=${response.url} />`;
  });
};

quote.addEventListener("click", () => getQuote());
