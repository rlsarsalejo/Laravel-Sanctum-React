
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RouteGuard = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (!isAuthenticated) {
    // Redirect to login page, saving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the token is expired
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
    // Token is expired, clear it and redirect to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    return <Navigate to="/login" state={{ from: location, message: "Your session has expired. Please log in again." }} replace />;
  }

  return children;  
};

export default RouteGuard;