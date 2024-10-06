import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../auth/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoute;
