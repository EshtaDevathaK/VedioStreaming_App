import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { searchMovies, getMovieDetails } from '../lib/omdb';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchAndProcessMovies = async () => {
      if (!searchQuery.trim()) {
        setMovies([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchResults = await searchMovies(searchQuery);
        
        if (!searchResults.length) {
          setMovies([]);
          return;
        }

        const processedMovies = await Promise.all(
          searchResults.map(async (result: any) => {
            const details = await getMovieDetails(result.imdbID);
            if (!details) return null;

            return {
              id: result.imdbID,
              title: result.Title,
              description: details.Plot || 'No plot available',
              poster_url: result.Poster !== 'N/A' ? result.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop',
              rating: parseFloat(details.imdbRating || '0'),
              release_year: parseInt(result.Year, 10),
              original_language: details.Language?.split(', ')[0] || 'English',
              genre: details.Genre?.split(', ') || [],
              trending_score: parseFloat(details.imdbRating || '0') * 10
            };
          })
        );

        const validMovies = processedMovies.filter((movie): movie is Movie => movie !== null);
        setMovies(validMovies);
      } catch (err: any) {
        console.error('Error searching movies:', err);
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(searchAndProcessMovies, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full pl-12 pr-4 py-3 bg-background-light rounded-lg border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 bg-red-500/10 rounded-lg p-4">
          {error}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          {searchQuery && movies.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              No movies found matching "{searchQuery}"
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Search;