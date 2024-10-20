import { useState } from 'react';

import CalendarNavBar from './CalendarNavBar/CalendarNavBar';
import styles from './Calendar.module.css';
import WeekView from './WeekView/WeekView';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';

const Calendar = () => {
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => setSideBar(!sideBar);

  return (
    <div className={styles.screen}>
      <SideBar showSideBar={showSideBar} sideBar={sideBar}/>
      <div className={styles.nav}>
        <NavBar />
        <div className={styles.main}>
          <div className={styles.calendar}>
            <CalendarNavBar />
            <WeekView/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar;