import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isInitialized } = useUser();

  if (isLoading && !isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00B7E0]"></div>
      </div>
    );
  }

  if (isInitialized && (!user.name || !user.email || (!localStorage.getItem('token') && !sessionStorage.getItem('token')))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
