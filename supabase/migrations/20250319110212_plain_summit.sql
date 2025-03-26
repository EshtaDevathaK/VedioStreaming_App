/*
  # Create movies table with genre support

  1. New Tables
    - `movies`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `poster_url` (text)
      - `rating` (numeric)
      - `release_year` (integer)
      - `original_language` (text)
      - `genre` (text array)
      - `trending_score` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `movies` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  poster_url text NOT NULL,
  rating numeric NOT NULL DEFAULT 0,
  release_year integer NOT NULL,
  original_language text NOT NULL,
  genre text[] NOT NULL,
  trending_score numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON movies
  FOR SELECT
  TO public
  USING (true);