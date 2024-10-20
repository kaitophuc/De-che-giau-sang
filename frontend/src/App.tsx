import { useState } from 'react';
import { useRoutes } from 'react-router-dom';

import Calendar from './pages/Calendar/Calendar.tsx';
import styles from './App.module.css';

const App: React.FC = () => {
  const router = useRoutes([
    {
      path: '/',
      element: <Calendar />,
    }
  ])

  return (
    <>
      {router}
    </>
  );
};

export default App;