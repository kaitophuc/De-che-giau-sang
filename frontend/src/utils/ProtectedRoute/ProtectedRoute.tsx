import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../pages/Auth/hooks/useAuth.tsx';
import { AuthContext } from '../../pages/Auth/context/AuthContext.tsx';
// import Loading from '../Loading/Loading.tsx';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  // if (loading) {
  //   return <Loading />
  // }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;