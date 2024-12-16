import { useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import Calendar from './pages/Calendar.tsx';
import Login from './pages/Login.tsx';
// import Register from './pages/Auth/Register.tsx';
import ProtectedRoute from './utils/ProtectedRoute/ProtectedRoute.tsx';
import { AuthContext } from './context/AuthContext.tsx';
import { User } from './hooks/useUser.tsx';
// import { useAuth } from './pages/Auth/hooks/useAuth.tsx';

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
    }
  ])

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, setUser, loading, setLoading }), [user, setUser, loading, setLoading])}>
      {router}
    </AuthContext.Provider>
  );
};

export default App;