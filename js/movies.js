const API_KEY = "3c34c64c2517ba3363f54835b4429d0e";

// Fetch all popular movies for both pages
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => displayMovies(data.results))
  .catch(error => {
    console.error('Error fetching movies:', error);
  });

function displayMovies(movies) {
  const container = document.getElementById("movies");

  movies.forEach(movie => {
    container.innerHTML += `
      <div onclick="handleMovieClick(${movie.id})" class="cursor-pointer group relative overflow-hidden rounded-lg">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
             alt="${movie.title}" 
             class="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h3 class="text-white text-sm md:text-base font-semibold">${movie.title}</h3>
        </div>
      </div>
    `;
  });
}

function handleMovieClick(movieId) {
  // Check if user is logged in
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
    return;
  }
  
  // If logged in, proceed to details
  window.location.href = `details.html?id=${movieId}`;
}