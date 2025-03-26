export interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface ChatbotResponse {
  message: string;
  lastMovie: string | null;
  lastQueryType: string | null;
}

export interface MovieInfo {
 
  Title: string;
  Year?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Genre?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Metascore?: string;
  Production?: string;
  Released?: string;
  Runtime?: string;
  Writer?: string;
  Country?: string;
  Language?: string;
  Rated?: string;
  Composer?: string;
  SoundMix?: string;
  DVD?: string;
  Website?: string;
  Response: string;
  Ratings?: Array<{ Source: string; Value: string; }>;
}


