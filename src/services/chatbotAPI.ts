import axios from 'axios';
import type { ChatbotResponse, MovieInfo } from '../types copy/chatbot';

const API_KEY = import.meta.env.VITE_OMDB_API;  // Replace with your API key
const BASE_URL = "https://www.omdbapi.com/";

export const sendMessage = async (
  query: string,
  lastMovieTitle: string | null = null,
  lastQueryType: string | null = null
): Promise<ChatbotResponse> => {
  const isDirectorQuestion = query.toLowerCase().includes("who is the director");
  const isCastQuestion = query.toLowerCase().includes("who are the main actors");
  
  if ((isDirectorQuestion || isCastQuestion) && lastMovieTitle) {
    try {
      const response = await axios.get<MovieInfo>(BASE_URL, {
        params: {
          apikey: API_KEY,
          t: lastMovieTitle
        }
      });

      const data = response.data;

      if (data.Response === "False") {
        return {
          message: `I couldn't find any information about "${lastMovieTitle}". Could you try another movie title?`,
          lastMovie: null,
          lastQueryType: null
        };
      }

      if (isDirectorQuestion) {
        return {
          message: `The director of "${data.Title}" is ${data.Director || "Unknown"}.`,
          lastMovie: data.Title,
          lastQueryType: 'director'
        };
      }

      if (isCastQuestion) {
        return {
          message: `The main cast of "${data.Title}" includes: ${data.Actors || "Unknown"}`,
          lastMovie: data.Title,
          lastQueryType: 'cast'
        };
      }
    } catch (error) {
      console.error('Error in chatbot API:', error);
      return {
        message: "I'm having trouble retrieving the information right now. Please try again in a moment.",
        lastMovie: lastMovieTitle,
        lastQueryType: null
      };
    }
  }

  // Handle "More details" request with context awareness
  if (query.toLowerCase() === "more details" && lastMovieTitle) {
    try {
      const response = await axios.get<MovieInfo>(BASE_URL, {
        params: {
          apikey: API_KEY,
          t: lastMovieTitle,
          plot: 'full'
        }
      });

      const data = response.data;

      if (data.Response === "False") {
        return {
          message: `I couldn't find any information about "${lastMovieTitle}". Could you try another movie title?`,
          lastMovie: null,
          lastQueryType: null
        };
      }

      // If the last query was about the director, show detailed director info
      if (lastQueryType === 'director') {
        const directorInfo = {
          name: data.Director || "Unknown",
          movie: data.Title,
          year: data.Year || "Unknown",
          genre: data.Genre || "Unknown",
          awards: data.Awards || "Unknown",
          boxOffice: data.BoxOffice || "Unknown",
          production: data.Production || "Unknown",
          released: data.Released || "Unknown",
          country: data.Country || "Unknown"
        };

        return {
          message: `📽️ Detailed Director Information:

👤 Director: ${directorInfo.name}

🎬 Recent Work:
- Directed "${directorInfo.movie}" (${directorInfo.year})
- Genre: ${directorInfo.genre}

🏆 Recognition:
- Awards: ${directorInfo.awards}
- Box Office: ${directorInfo.boxOffice}

🎥 Production Details:
- Production Company: ${directorInfo.production}
- Release Date: ${directorInfo.released}
- Country: ${directorInfo.country}`,
          lastMovie: data.Title,
          lastQueryType: 'director'
        };
      }

      // If the last query was about the cast, show detailed cast info
      if (lastQueryType === 'cast') {
        const castInfo = {
          cast: data.Actors || "Unknown",
          movie: data.Title,
          year: data.Year || "Unknown",
          genre: data.Genre || "Unknown",
          runtime: data.Runtime || "Unknown",
          awards: data.Awards || "Unknown",
          boxOffice: data.BoxOffice || "Unknown",
          production: data.Production || "Unknown",
          country: data.Country || "Unknown",
          language: data.Language || "Unknown"
        };

        return {
          message: `📽️ Detailed Cast Information:

🎭 Main Cast: ${castInfo.cast}

🎬 Movie Details:
- Title: "${castInfo.movie}" (${castInfo.year})
- Genre: ${castInfo.genre}
- Runtime: ${castInfo.runtime}

🏆 Cast Achievements:
- Awards: ${castInfo.awards}
- Box Office: ${castInfo.boxOffice}

📝 Additional Information:
- Production: ${castInfo.production}
- Country: ${castInfo.country}
- Language: ${castInfo.language}`,
          lastMovie: data.Title,
          lastQueryType: 'cast'
        };
      }

      // If no specific context, show full movie details
      const movieInfo = {
        title: data.Title,
        year: data.Year || "Unknown",
        plot: data.Plot || "Unknown",
        rating: data.imdbRating || "Unknown",
        votes: data.imdbVotes || "Unknown",
        rottenTomatoes: data.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value || "Unknown",
        metacritic: data.Metascore || "Unknown",
        director: data.Director || "Unknown",
        writers: data.Writer || "Unknown",
        cast: data.Actors || "Unknown",
        production: data.Production || "Unknown",
        genre: data.Genre || "Unknown",
        runtime: data.Runtime || "Unknown",
        awards: data.Awards || "Unknown",
        boxOffice: data.BoxOffice || "Unknown",
        country: data.Country || "Unknown",
        language: data.Language || "Unknown",
        released: data.Released || "Unknown",
        rated: data.Rated || "Unknown",
        composer: data.Composer || "Unknown",
        soundMix: data.SoundMix || "Unknown",
        dvd: data.DVD || "Unknown",
        website: data.Website || "Unknown"
      };

      return {
        message: `📽️ Detailed Information about "${movieInfo.title}" (${movieInfo.year}):

🎭 Full Plot: ${movieInfo.plot}

📊 Ratings:
⭐ IMDb: ${movieInfo.rating}/10 (${movieInfo.votes} votes)
🍅 Rotten Tomatoes: ${movieInfo.rottenTomatoes}
📝 Metacritic: ${movieInfo.metacritic}/100

🎬 Production Details:
👤 Director: ${movieInfo.director}
✍️ Writers: ${movieInfo.writers}
🎭 Cast: ${movieInfo.cast}
🏢 Production: ${movieInfo.production}
🎥 Genre: ${movieInfo.genre}
⏱️ Runtime: ${movieInfo.runtime}

🏆 Recognition:
🌟 Awards: ${movieInfo.awards}
💰 Box Office: ${movieInfo.boxOffice}

📝 Additional Information:
🌍 Country: ${movieInfo.country}
🗣️ Language: ${movieInfo.language}
📅 Released: ${movieInfo.released}
🔍 Rated: ${movieInfo.rated}

🎵 Music & Sound:
🎼 Composer: ${movieInfo.composer}
🔊 Sound Mix: ${movieInfo.soundMix}

💿 DVD/Streaming Release: ${movieInfo.dvd}
🌐 Website: ${movieInfo.website}`,
        lastMovie: data.Title,
        lastQueryType: null
      };
    } catch (error) {
      console.error('Error in chatbot API:', error);
      return {
        message: "I'm having trouble retrieving the detailed information right now. Please try again in a moment.",
        lastMovie: null,
        lastQueryType: null
      };
    }
  }

  // Regular search query handling
  try {
    const response = await axios.get<MovieInfo>(BASE_URL, {
      params: {
        apikey: API_KEY,
        t: query
      }
    });

    const data = response.data;

    if (data.Response === "False") {
      return {
        message: `I couldn't find any information about "${query}". Could you try another movie title?`,
        lastMovie: null,
        lastQueryType: null
      };
    }

    return {
      message: `Here's what I found about "${data.Title}" (${data.Year || "Unknown"}):
      
🎭 Plot: ${data.Plot || "Unknown"}
⭐ Rating: ${data.imdbRating || "Unknown"}/10
🎬 Director: ${data.Director || "Unknown"}
🎭 Cast: ${data.Actors || "Unknown"}
🏆 Awards: ${data.Awards || "Unknown"}
💰 Box Office: ${data.BoxOffice || "Unknown"}`,
      lastMovie: data.Title,
      lastQueryType: null
    };
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return {
      message: "I'm having trouble connecting to the movie database right now. Please try again in a moment.",
      lastMovie: null,
      lastQueryType: null
    };
  }
};