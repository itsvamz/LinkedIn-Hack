import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, LogIn, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    role: "",
    avatar: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkMode);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (loggedIn) {
      const profile = {
        name: localStorage.getItem("userName") || "John Doe",
        role: localStorage.getItem("userRole") || "user",
        avatar: localStorage.getItem("userAvatar") || "",
      };
      setUserProfile(profile);
    }
  }, [location]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/users", label: "Talent" },
    { path: "/jobs", label: "Jobs" },
    { path: "/recruiters", label: "Recruiters" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/about", label: "About" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleProfileClick = () => {
    if (userProfile.role === "recruiter") {
      window.location.href = "/recruiter-dashboard";
    } else {
      window.location.href = "/user-dashboard";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userAvatar");
    setIsLoggedIn(false);
    setUserProfile({ name: "", role: "", avatar: "" });
    window.location.href = "/";
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AVIRI
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
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* {userProfile.role === "recruiter" && (
              <Link
                to="/bookmarks"
                className={`text-sm font-medium transition-colors ${
                  isActive("/bookmarks")
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Bookmarks
              </Link>
            )} */}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="flex items-center">
                🌐 <span className="ml-1">Language:</span>
              </span>
              <div id="google_translate_element" className="translate-dropdown" />
            </div>

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
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
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
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 mt-4 pt-4"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-md"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {userProfile.role === "recruiter" && (
                <Link
                  to="/bookmarks"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/bookmarks")
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-md"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  }`}
                >
                  Bookmarks
                </Link>
              )}

              <div className="px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
              </div>

              <div className="px-3 py-2">
                <div id="google_translate_element" className="text-sm mb-2" />
              </div>

              <div className="pt-2 space-y-2">
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
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {userProfile.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {userProfile.role}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        handleProfileClick();
                        setIsOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      Dashboard
                    </Button>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
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
