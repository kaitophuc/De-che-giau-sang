import { useState } from 'react';

import NavBar from './components/NavBar/NavBar.tsx';
import SideBar from './components/SideBar/SideBar.tsx';
import Calendar from './components/Calendar/Calendar.tsx';
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
