import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieChatbot from './components/MovieChatbot/MovieChatbot';


// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Search = React.lazy(() => import('./pages/Search'));
const Genres = React.lazy(() => import('./pages/Genres'));
const Profile = React.lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white">
        <Navbar />
        
        <main className="pt-16 pb-8">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </React.Suspense>
        </main>
        <MovieChatbot />
       
      </div>
     
    </Router>
  );
}

export default App;