import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Globe } from 'lucide-react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <motion.div
      className="relative group w-64 h-96 rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <h3 className="text-xl font-bold text-white">{movie.title}</h3>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-primary-light mr-1" />
              <span>{movie.release_year}</span>
            </div>
            
            <div className="flex items-center">
              <Globe className="w-4 h-4 text-secondary-light mr-1" />
              <span>{movie.original_language}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genre.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary-light"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;