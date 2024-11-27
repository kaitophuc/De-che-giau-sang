import { useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import Calendar from './pages/Calendar/Calendar.tsx';
import Login from './pages/Auth/Login.tsx';
import Register from './pages/Auth/Register.tsx';
import ProtectedRoute from './utils/ProtectedRoute/ProtectedRoute.tsx';
import { AuthContext } from './pages/Auth/context/AuthContext.tsx';
import { User } from './pages/Auth/hooks/useUser.tsx';
import { useAuth } from './pages/Auth/hooks/useAuth.tsx';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const { user, login, logout, setUser } = useAuth();

  const router = useRoutes([
    {
      path: '/',
      element: <ProtectedRoute element={<Calendar />} />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    }
  ])

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, setUser, loading, setLoading }), [user, setUser, loading, setLoading])}>
      {router}
    </>
  );
};

export default App;