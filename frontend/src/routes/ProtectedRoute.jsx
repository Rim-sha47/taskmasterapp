import { Navigate, Outlet, useLocation } from 'react-router-dom';

function isAuthenticated() {
  return localStorage.getItem('taskmaster_auth') === 'true';
}

export default function ProtectedRoute() {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
