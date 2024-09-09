import React, { useState, useEffect, useRef } from 'react';
import { CircleUser, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuth, logout } from '../../Utils/apiService'; // Assuming these functions are in your apiService

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Store current user info
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fetch the current user when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkAuth();
        setCurrentUser(user); // Set user data to state
      } catch (error) {
        console.error('Failed to fetch user:', error.message);
        // Handle user not logged in, possibly redirect to login
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout(); // Call the API logout function
      localStorage.removeItem('authToken');
      localStorage.removeItem('tokenExpiration');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const profileLinks = [
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-700">
              Development App
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile Picture and Dropdown - Desktop */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            {currentUser && (
              <div className="flex items-center">
                {/* Display user name */}
               
                <button
                  onClick={toggleDropdown}
                  className="focus:outline-none mr-2"
                  aria-label="User menu"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  {/* User Profile Image or Icon */}
                  <CircleUser className="w-8 h-8" />
                  
                </button>
                <span className="mr-2 text-gray-600 text-lg font-semibold">{currentUser.name}</span>
              </div>
            )}

            {/* Dropdown Menu - Desktop */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                {profileLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Profile Links in Mobile Menu */}
            {profileLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
