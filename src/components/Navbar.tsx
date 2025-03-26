
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Film, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/genres', icon: Film, label: 'Genres' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-background-dark/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-pulse">
              VidNexus
            </span>
          </Link>

          <div className="flex space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className="relative group"
              >
                <motion.div
                  className={`flex flex-col items-center space-y-1 ${
                    location.pathname === path ? 'text-primary' : 'text-gray-400'
                  } hover:text-primary transition-colors duration-200`}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{label}</span>
                  {location.pathname === path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="navbar-indicator"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;