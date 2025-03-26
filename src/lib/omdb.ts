import axios from 'axios';

const OMDB_API_KEY = '8615b10';
const OMDB_BASE_URL = 'https://www.omdbapi.com';

export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${query}&type=movie`);
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }
    return response.data.Search || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (imdbId: string) => {
  try {
    const response = await axios.get(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`);
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};