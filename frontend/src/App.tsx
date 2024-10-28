import { useRoutes } from 'react-router-dom';

import Calendar from './pages/Calendar/Calendar.tsx';
import Login from './pages/Auth/Login.tsx';

const App: React.FC = () => {
  const router = useRoutes([
    {
      path: '/',
      element: <Calendar />,
    },
    {
      path: '/login',
      element: <Login />,
    }
  ])

  return (
    <>
      {router}
    </>
  );
};

export default App;