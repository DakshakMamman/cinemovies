protectPage();

const API_KEY = "3c34c64c2517ba3363f54835b4429d0e";

const id = new URLSearchParams(window.location.search).get("id");

let trailerData = null;

// FETCH DETAILS
fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(movie => {
    // Update page title
    document.title = `${movie.title} - CineStream`;
    
    // Update hero backdrop
    document.getElementById('hero-backdrop').src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    
    // Update poster
    document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    
    // Update basic info
    document.getElementById('title').innerText = movie.title;
    document.getElementById('desc').innerText = movie.overview;
    document.getElementById('rating').innerText = movie.vote_average.toFixed(1);
    document.getElementById('year').innerText = new Date(movie.release_date).getFullYear();
    document.getElementById('runtime').innerText = formatRuntime(movie.runtime);
    document.getElementById('release-date').innerText = new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Update genres
    const genresContainer = document.getElementById('genres');
    genresContainer.innerHTML = movie.genres.map(genre => 
      `<span class="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">${genre.name}</span>`
    ).join('');
    
    // Update cast
    const castContainer = document.getElementById('cast');
    castContainer.innerHTML = movie.cast.slice(0, 3).map(person => `
      <div class="flex items-center gap-3">
        <img src="https://image.tmdb.org/t/p/w200${person.profile_path}" alt="${person.name}" class="w-12 h-12 rounded-full object-cover" />
        <div>
          <p class="text-white font-medium">${person.name}</p>
          <p class="text-gray-400 text-sm">${person.character}</p>
        </div>
      </div>
    `).join('');
    
    // Update crew
    const crewContainer = document.getElementById('crew');
    const director = movie.crew.find(person => person.job === 'Director');
    const producer = movie.crew.find(person => person.job === 'Producer');
    
    if (director || producer) {
      crewContainer.innerHTML = `
        ${director ? `
          <div class="flex items-center gap-3">
            <img src="https://image.tmdb.org/t/p/w200${director.profile_path}" alt="Director" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <p class="text-white font-medium">${director.name}</p>
              <p class="text-gray-400 text-sm">Director</p>
            </div>
          </div>
        ` : ''}
        
        ${producer ? `
          <div class="flex items-center gap-3">
            <img src="https://image.tmdb.org/t/p/w200${producer.profile_path}" alt="Producer" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <p class="text-white font-medium">${producer.name}</p>
              <p class="text-gray-400 text-sm">Producer</p>
            </div>
          </div>
        ` : ''}
      `;
    }
  });

// FETCH TRAILER
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    trailerData = data.results.find(v => v.type === "Trailer");
    
    // Hide play button if no trailer, show if trailer exists
    const playBtn = document.getElementById("play-trailer-btn");
    if (!trailerData) {
      playBtn.style.display = "none";
    } else {
      playBtn.style.display = "inline-block";
    }
  });

// PLAY TRAILER FUNCTION
document.getElementById("play-trailer-btn").addEventListener("click", function() {
  if (trailerData) {
    document.getElementById("player").innerHTML = `
      <div class="mt-4">
        <iframe width="100%" height="400"
        src="https://www.youtube.com/embed/${trailerData.key}"
        allowfullscreen class="rounded-lg"></iframe>
      </div>
    `;
    document.getElementById("player").classList.remove("hidden");
    this.style.display = "none";
  }
});