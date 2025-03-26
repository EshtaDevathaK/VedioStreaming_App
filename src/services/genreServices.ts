import axios from 'axios';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Genre?: string;
}

export interface MovieDetails extends Movie {
  Genre: string;
  Plot: string;
  Director: string;
  Actors: string;
  imdbRating: string;
}

const API_KEY = import.meta.env.VITE_OMDB_API;
export const CACHE_TIME = 1000 * 60 * 5; // 5 minutes
export const genres = ['Action', 'Comedy', 'Drama', 'Romance', 'Thriller', 'Sci-Fi'];

const movieCache = new Map<string, MovieDetails>();

const fetchMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  if (movieCache.has(imdbID)) {
    return movieCache.get(imdbID)!;
  }

  const { data } = await axios.get(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
  );
  movieCache.set(imdbID, data);
  return data;
};

export const fetchMoviesByGenre = async (genre: string): Promise<Movie[]> => {
  const searchTerms = ['movie', 'star', 'love', 'war', 'life'];
  const allMovies: Movie[] = [];

  await Promise.all(
    searchTerms.map(async (term) => {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}&type=movie`
      );

      if (data.Response === 'True') {
        const moviesWithGenres = await Promise.all(
          data.Search.slice(0, 4).map(async (movie: Movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return { ...movie, Genre: details.Genre };
          })
        );

        const filteredMovies = moviesWithGenres.filter((movie: Movie) =>
          movie.Genre?.includes(genre)
        );
        allMovies.push(...filteredMovies);
      }
    })
  );

  return allMovies.slice(0, 12);
};