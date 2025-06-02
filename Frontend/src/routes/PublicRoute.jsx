import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const PublicRoute = ({ children }) => {
  const { user, isLoading, isInitialized } = useUser();
  
  if (isInitialized && user.name && user.email && localStorage.getItem('token')) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
