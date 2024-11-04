import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../pages/Auth/hooks/useAuth.tsx';
import { AuthContext } from '../../pages/Auth/context/AuthContext.tsx';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useContext(AuthContext);
  console.log(user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;