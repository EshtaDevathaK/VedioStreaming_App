import React, { useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Film } from 'lucide-react';
import { fetchMoviesByGenre, genres, CACHE_TIME } from "../services/genreServices";
import type { Movie } from '../services/genreServices';

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20"
  >
    <div className="aspect-[2/3] relative">
      <img
        loading="lazy"
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
        alt={movie.Title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-1 truncate">{movie.Title}</h3>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">{movie.Year}</span>
        {movie.Genre && (
          <span className="text-sm text-purple-400">{movie.Genre.split(',')[0]}</span>
        )}
      </div>
    </div>
  </motion.div>
);

const GenrePage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const { data: movies = [], isLoading, error } = useQuery(
    ['movies', selectedGenre],
    () => selectedGenre ? fetchMoviesByGenre(selectedGenre) : Promise.resolve([]),
    {
      enabled: !!selectedGenre,
      staleTime: CACHE_TIME,
      cacheTime: CACHE_TIME,
      retry: 1
    }
  );

  const handleGenreSelect = useCallback((genre: string) => {
    setSelectedGenre(genre);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Movie Genre Explorer
        </h1>

        <div className="mb-12">
          <div className="flex flex-wrap gap-4">
            {genres.map((genre) => (
              <motion.button
                key={genre}
                onClick={() => handleGenreSelect(genre)}
                className={`
                  px-6 py-3 rounded-full text-lg font-semibold
                  ${
                    selectedGenre === genre
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50'
                      : 'bg-gray-800 text-gray-300 hover:bg-purple-600/20'
                  }
                  transition-all duration-200
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <Film className="w-5 h-5" />
                  <span>{genre}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {Boolean(error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-8"
          >
            An error occurred while fetching movies. Please try again later.
          </motion.div>
        ))}

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <motion.div
                className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="movies"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
              {selectedGenre && movies.length === 0 && !isLoading && (
                <div className="col-span-full text-center text-gray-400 text-lg">
                  No movies found in the "{selectedGenre}" genre
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

export default function Genre() {
  return (
    <QueryClientProvider client={queryClient}>
      <GenrePage />
    </QueryClientProvider>
  );
}