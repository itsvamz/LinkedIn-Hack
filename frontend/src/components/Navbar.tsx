
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: '', role: '', avatar: '' });
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in (you can replace this with actual auth logic)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      // Get user profile from localStorage or API
      const profile = {
        name: localStorage.getItem('userName') || 'John Doe',
        role: localStorage.getItem('userRole') || 'user',
        avatar: localStorage.getItem('userAvatar') || ''
      };
      setUserProfile(profile);
    }
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/users', label: 'Talent' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleProfileClick = () => {
    // Navigate to appropriate dashboard based on role
    if (userProfile.role === 'recruiter') {
      window.location.href = '/recruiter-dashboard';
    } else {
      window.location.href = '/user-dashboard';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userAvatar');
    setIsLoggedIn(false);
    setUserProfile({ name: '', role: '', avatar: '' });
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              TalentFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Avatar 
                  className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all"
                  onClick={handleProfileClick}
                >
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 border-t border-gray-200 mt-4 pt-4"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50 rounded-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center px-3 py-2">
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                        <AvatarFallback className="bg-blue-600 text-white text-sm">
                          {getInitials(userProfile.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{userProfile.role}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        handleProfileClick();
                        setIsOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Dashboard
                    </Button>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-gray-300 text-gray-700">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Join Now
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
