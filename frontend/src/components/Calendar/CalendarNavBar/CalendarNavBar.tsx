import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from './CalendarNavBar.module.css';

const CalendarNavBar = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [view, setView] = useState('Week');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    setCurrentDate(formattedDate);
  }, [])

  const changeDate = (isBackward: boolean) => {
    const date = new Date(currentDate)
    if (view == 'Day') {
      date.setDate(date.getDate() + (isBackward ? -1 : 1));
      const formattedDate = date.toLocaleDateString();
      setCurrentDate(formattedDate);
    } else if (view == 'Week') {
      date.setDate(date.getDate() + (isBackward ? -7 : 7));
      const formattedDate = date.toLocaleDateString();
      setCurrentDate(formattedDate);
    } else if (view == 'Month') {
      date.setMonth(date.getMonth() + (isBackward ? -1 : 1));
      const formattedDate = date.toLocaleDateString();
      setCurrentDate(formattedDate);
    }
  }

  const changeView = (view: string) => {
    setView(view);
  }

  return (
    <div className={styles.calendar_navbar}>
      <div className={styles.center}>
        <button className={styles.navigator} onClick={() => changeDate(true)}>
          <FontAwesomeIcon icon={faCircleChevronLeft} style={{ fontSize: '20px', color: '#C3CAD9' }}/>
        </button>
        <p className={styles.date}>{currentDate}</p>
        <button className={styles.navigator} onClick={() => changeDate(false)}>
          <FontAwesomeIcon icon={faCircleChevronRight} style={{ fontSize: '20px', color: '#C3CAD9' }}/>
        </button>
      </div>
      <div className={styles.view}>
        <button className={`${styles.viewButton} ${view == 'Day' ? styles.active : ''}`} onClick={() => changeView('Day')}>Day</button>
        <button className={`${styles.viewButton} ${view == 'Week' ? styles.active : ''}`} onClick={() => changeView('Week')}>Week</button>
        <button className={`${styles.viewButton} ${view == 'Month' ? styles.active : ''}`} onClick={() => changeView('Month')}>Month</button>
      </div>
    </div>
  )
}

export default CalendarNavBar;