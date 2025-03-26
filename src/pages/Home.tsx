import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { searchMovies, getMovieDetails } from '../lib/omdb';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types';

const avengers = [
  {
    name: 'Moana',
    image: 'https://images.hdqwalls.com/download/disney-moana-4k-img-3440x1440.jpg'
  },
  {
    name: 'Po (Kung Fu Panda)',
    image: 'https://c4.wallpaperflare.com/wallpaper/761/273/222/kung-fu-panda-kung-fu-panda-3-po-kung-fu-panda-wallpaper-preview.jpg'
  },
  {
    name: 'Cosmic Guardian',
    image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop'
  },
  {
    name: 'Bloody Sweet',
    image: 'https://images.filmibeat.com/img/2023/06/vijayleofirstlook-1687346501.jpg'
  },
  {
    name: 'Mystic Protector',
    image: 'https://images.unsplash.com/photo-1560932684-5e552e2894e9?w=800&auto=format&fit=crop'
  },
 
   
    {
      name: 'Elsa',
      image: 'https://wallpapers.com/images/featured/elsa-9lxawfiacgrrzmfw.jpg'
    },
   
    {
      name: 'SpongeBob',
      image: 'https://wallpapers.com/images/featured/spongebob-x2193safrzp55yqs.jpg'
    },

   
  
];

// Popular and trending movies to fetch
const FEATURED_MOVIES = ['Avengers', 'Batman', 'Spider-Man', 'Superman'];

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [currentAvenger, setCurrentAvenger] = useState(avengers[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const moviePromises = FEATURED_MOVIES.map(async (query) => {
          const searchResults = await searchMovies(query);
          const movieDetails = await Promise.all(
            searchResults.slice(0, 2).map(async (result: any) => {
              const details = await getMovieDetails(result.imdbID);
              if (!details) return null;

              return {
                id: result.imdbID,
                title: result.Title,
                description: details.Plot || 'No plot available',
                poster_url: result.Poster !== 'N/A' ? result.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop',
                rating: parseFloat(details.imdbRating || '0'),
                release_year: parseInt(details.Year, 10),
                original_language: details.Language?.split(', ')[0] || 'English',
                genre: details.Genre?.split(', ') || [],
                trending_score: parseFloat(details.imdbRating || '0') * 10
              };
            })
          );

          return movieDetails.filter((movie): movie is Movie => movie !== null);
        });

        const allMoviesArrays = await Promise.all(moviePromises);
        const allMovies = allMoviesArrays.flat();

        // Sort by rating for trending movies
        const sortedByRating = [...allMovies].sort((a, b) => b.rating - a.rating);
        
        setTrendingMovies(sortedByRating.slice(0, 4));
        setMovies(allMovies);
      } catch (err: any) {
        console.error('Error fetching movies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * avengers.length);
      setCurrentAvenger(avengers[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="bg-red-500/20 text-red-500 p-4 rounded-lg max-w-md text-center">
          <p className="text-lg font-semibold">Error loading movies</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12">
      {/* Hero Section with Flying Avenger */}
      <section className="relative h-[70vh] rounded-2xl overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={currentAvenger.image}
            alt={currentAvenger.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/50 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src={currentAvenger.image}
            alt={currentAvenger.name}
            className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-lg shadow-primary/50"
          />
        </motion.div>

        <div className="absolute bottom-8 left-8 max-w-xl">
          <motion.h1
            className="text-5xl font-bold mb-4  from-primary to-accent bg-clip-text   animate-neon-pulse"
           
            
          >
            Welcome to VidNexus
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Your gateway to endless entertainment with an AI-enhanced experience
          </motion.p>
        </div>
      </section>

      {/* Trending Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Trending Now
          </span>
          <motion.span
            className="ml-2 text-yellow-400"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            🔥
          </motion.span>

        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Latest Releases */}
      <section>
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          Latest Releases
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.slice(0, 8).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;