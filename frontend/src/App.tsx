import { useState } from 'react';

import NavBar from './pages/NavBar/NavBar.tsx';
import SideBar from './pages/SideBar/SideBar.tsx';
import Calendar from './pages/Calendar/Calendar.tsx';
import styles from './App.module.css';

const App = () => {
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sideBar);

  return (
    <div className={styles.screen}>
      <SideBar showSideBar={showSideBar} sideBar={sideBar}/>
      <div className={styles.nav}>
        <NavBar />
        <div className={styles.main}>
          <Calendar sideBar={sideBar}/>
        </div>
      </div>
    </div>
  );
};

export default App;
