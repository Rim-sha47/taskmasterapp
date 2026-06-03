import { Navigate, Outlet, useLocation } from 'react-router-dom';

function isAuthenticated() {
  const token = localStorage.getItem('token');

  return !!token;
}

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}