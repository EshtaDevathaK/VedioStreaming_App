import { supabase } from "../lib/supabase";
import type { Movie } from "../types";

export const fetchMoviesByGenre = async (genre: string): Promise<Movie[]> => {
  try {
    console.log("Fetching movies for genre:", genre); // Debugging

    const { data, error } = await supabase
      .from("movies") // Ensure "movies" table exists
      .select("*")
      .contains("genre", [genre]);

    if (error) throw error;
    
    console.log("Movies fetched:", data); // Debugging
    return data || [];
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};
