const apiKey = "YOUR_API_KEY"; // get from https://www.omdbapi.com/apikey.aspx

document.getElementById("searchBtn").addEventListener("click", searchMovie);
const movieContainer = document.getElementById("movieContainer");
const watchlistContainer = document.getElementById("watchlist");

// Load existing watchlist from localStorage
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
renderWatchlist();

async function searchMovie() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return alert("Enter a movie title or year!");

  movieContainer.innerHTML = "Loading...";
  const res = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`);
  const data = await res.json();

  if (data.Response === "False") {
    movieContainer.innerHTML = `<p>No movie found!</p>`;
    return;
  }

  movieContainer.innerHTML = `
    <div class="movie-card">
      <img src="${data.Poster}" alt="${data.Title}">
      <h3>${data.Title}</h3>
      <p><b>Genre:</b> ${data.Genre}</p>
      <p><b>Director:</b> ${data.Director}</p>
      <p><b>IMDb Rating:</b> ⭐ ${data.imdbRating}</p>
      <button class="add-watchlist" onclick="addToWatchlist('${data.Title}')">+ Add to Watchlist</button>
    </div>
  `;
}

function addToWatchlist(title) {
  if (!watchlist.includes(title)) {
    watchlist.push(title);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    renderWatchlist();
    alert(`${title} added to watchlist!`);
  } else {
    alert(`${title} is already in your watchlist.`);
  }
}

function renderWatchlist() {
  watchlistContainer.innerHTML = "";
  watchlist.forEach(title => {
    const li = document.createElement("li");
    li.textContent = title;
    watchlistContainer.appendChild(li);
  });
}
