/*
  # Add sample movies

  1. New Data
    - Add sample movies with various genres and ratings
    - Include trending scores for popular movies
*/

INSERT INTO movies (title, description, poster_url, rating, release_year, original_language, genre, trending_score)
VALUES
  (
    'Cosmic Adventures',
    'A thrilling space odyssey that challenges the boundaries of human exploration',
    'https://images.unsplash.com/photo-1636819488537-a9b1e5ff10ad?w=800&auto=format&fit=crop',
    4.5,
    2024,
    'English',
    ARRAY['Adventure', 'Sci-Fi'],
    95
  ),
  (
    'Love in Paris',
    'A heartwarming romance set in the city of lights',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
    4.2,
    2024,
    'French',
    ARRAY['Romcom', 'Love'],
    85
  ),
  (
    'Comedy Hour',
    'Non-stop laughter in this hilarious comedy special',
    'https://images.unsplash.com/photo-1543584756-8f40c400f629?w=800&auto=format&fit=crop',
    4.0,
    2024,
    'English',
    ARRAY['Comedy'],
    80
  ),
  (
    'Mountain Quest',
    'An epic adventure through treacherous peaks',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop',
    4.7,
    2024,
    'English',
    ARRAY['Adventure'],
    90
  );