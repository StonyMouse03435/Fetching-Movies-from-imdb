const url = 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies';
const releases = document.querySelector("#releases");

function convertMinutesToHHMMSS(min) {
  const totalSeconds = Math.floor(min * 60);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}h ${minutes}m ${seconds}s`;
}

let movies = [];
async function getMovies() {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c71061740dmsh9729085550b1113p11765djsn2ea369e81503",
      "x-rapidapi-host": "imdb236.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    movies = result
    releases.innerHTML = "";
    result?.forEach((movie) => {
      releases.innerHTML += `
      <button data-id="${movie.id}">
       <div class=" py-2">
              <img loading="lazy" class="object-cover 
              }" src="${movie?.primaryImage}" width="256" height="344" alt="" />
              <div class="flex gap-2 py-2 justify-between">
                <h3 class="">${movie?.originalTitle?.slice(0, 14)}..</h3>
                <div class="space-x-2">
                  <span class="p-1 rounded-md bg-customRed">HD</span>
                  <span class="border-customRed border-2 rounded-md p-1">
                    <img class="inline" src="./assets/icons/star.svg" alt="" />
                   ${movie?.averageRating}
                  </span>
                </div>
              </div>
            </div>
            </button>`;
    });
    const moviesBtns = document.querySelectorAll("button");
    const modalContainer = document.querySelector("#modal-container");
    const modal = document.querySelector("#modal");
    const modalCloseBtn = document.querySelector("#modal-close-btn");


    moviesBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const movieId = btn.getAttribute("data-id");

        const movie = movies.find((movie) => movie.id === movieId);



        modal.innerHTML = `<div class="movie-img-wrapper">
        <img loading="lazy" width="580" height="400" class="object-cover rounded-md"
         id="movie-img" src="${movie?.primaryImage}" alt="">
      </div>
      <div class="movie-details pl-8">
      <p class="text-sm flex items-center mb-6"><img src="./assets/icons/calendar.svg"/>${movie?.releaseDate}</p>
        <h1 class="font-bold text-3xl gap-2 mb-3">${movie?.primaryTitle}</h1>
        <p class="text-lg mb-4">${movie?.description}</p>
        <div class="flex items-center gap-4 mb-6">
          <p class="bg-green-500 px-1 rounded-lg">
          ${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(movie?.budget)} </p>
          <p class="border rounded-lg px-1 flex items-center gap-2"><img src="./assets/icons/speed.svg"/>${convertMinutesToHHMMSS(movie?.runtimeMinutes)}</p>
        </div>
        <a href="${movie?.trailer}" class="flex items-center gap-2" target="_blank"><img src="./assets/icons/play.svg"/> Trailer</a>
      </div>`;


        modalContainer.classList.remove("translate-y-2");
        modalContainer.classList.remove("opacity-100");
        modalContainer.classList.remove("-z-50");

        modalContainer.classList.add("translate-y-0");
        modalContainer.classList.add("opacity-100");
        modalContainer.classList.add("z-50");
      });
    });

    modalCloseBtn.addEventListener("click", e => {
      e.preventDefault();
      modalContainer.classList.remove("translate-y-2");
      modalContainer.classList.remove("opacity-100");
      modalContainer.classList.remove("-z-50");

      modalContainer.classList.add("translate-y-2");
      modalContainer.classList.add("opacity-0");
      modalContainer.classList.add("-z-50");
    });
  } catch (error) {
    console.error(error);
  }
}
getMovies();