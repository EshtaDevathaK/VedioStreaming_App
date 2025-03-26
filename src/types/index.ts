export interface Movie {
  imdbID?: string;   // For OMDB API
  id: string;
  title: string;
  description: string;
  poster_url: string;
  rating: number;
  release_year: number;
  original_language: string;
  genre: string[];
  trending_score: number;
}

export interface User {
  id: string;
  email: string;
  preferences: {
    favoriteGenres: string[];
    watchHistory: string[];
  };
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

 