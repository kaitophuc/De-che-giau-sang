import { useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import Calendar from './pages/Calendar.tsx';
import Auth from './pages/Auth.tsx';
import ProtectedRoute from './utils/ProtectedRoute/ProtectedRoute.tsx';
import { AuthContext } from './context/AuthContext.tsx';
import { User } from './hooks/useUser.tsx';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRoutes([
    {
      path: '/',
      element: <ProtectedRoute element={<Calendar />} />,
    },
    {
      path: '/auth',
      element: <Auth />,
    }
  ])

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, setUser, loading, setLoading }), [user, setUser, loading, setLoading])}>
      {router}
    </AuthContext.Provider>
  );
};

export default App;