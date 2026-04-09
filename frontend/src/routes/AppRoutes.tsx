import React from 'react';
import { Navigate,Route, Routes } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../views/Dashboard';
import Login from '../views/Login';
import Settings from '../views/Settings';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/settings"
        element={user ? <Settings /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
