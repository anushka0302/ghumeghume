import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.js';

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};