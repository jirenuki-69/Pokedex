import { Outlet, Navigate } from 'react-router-dom';
import { isLoggedIn } from '.';

const ProtectedRoutes = () => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
