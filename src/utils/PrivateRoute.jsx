import { Outlet, Navigate } from 'react-router-dom';
import { isLoggedIn } from '.';

const ProtectedRoutes = () => {
  return isLoggedIn ? <Outlet /> : <Outlet /> // <Navigate to="/login" />;
};

export default ProtectedRoutes;
