import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from './CalendarNavBar.module.css';

interface CalendarNavBarProps {
  view: string;
  startDay: Date | undefined;
  changeView: (view: string) => void;
  changeDate: (isBackward: boolean) => void;
  newEvent: () => void;
}

const CalendarNavBar: React.FC<CalendarNavBarProps> = ({view, startDay, changeView, changeDate, newEvent}) => {
  const [endDay, setEndDay] = useState<Date | undefined>(undefined);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (!startDay) return;
    const end = new Date(startDay);
    end.setDate(end.getDate() + 6);
    setEndDay(end);
  }, [startDay]);

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  const syncGoogle = async () => {
    console.log(`Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`);
    const response = await fetch('/api/auth/verify-token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`,
      },
      credentials: 'include',
    })
    const data = await response.json();
    if (data.success) {
      console.log(data.user);
      window.location.href = `http://localhost:5050/api/auth/google/sync/${data.user._id}`;
      console.log('Successfully synced with Google Calendar');
    } else {
      console.log('Failed to sync with Google Calendar');
    }
  }

  const syncMicrosoft = async () => {
    console.log(`Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`);
    const response = await fetch('/api/auth/verify-token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`,
      },
      credentials: 'include',
    })
    const data = await response.json();
    if (data.success) {
      console.log(data.user);
      window.location.href = `http://localhost:5050/api/auth/microsoft/sync/${data.user._id}`;
      console.log('Successfully synced with Microsoft Calendar');
    } else {
      console.log('Failed to sync with Microsoft Calendar');
    }
  }

  return (
    <div className={styles.calendar_navbar}>
      <div className={styles.left}>
        <button className={`${styles.leftButton}`} onClick={newEvent}>New event</button>
        <div className={`${styles.dropdown}`}>
          <button className={`${showDropdown ? styles.dropdownActiveButton : styles.dropdownInactiveButton} ${styles.leftButton} `} onClick={toggleDropdown}>Sync</button>
          {showDropdown && (
            <div className={styles.dropdownContent}>
              <button onClick={syncGoogle}>Sync with Google Calendar</button>
              <button onClick={syncMicrosoft}>Sync with Microsoft Outlook</button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.center}>
        <button className={styles.navigator} onClick={() => changeDate(true)}>
          <FontAwesomeIcon icon={faCircleChevronLeft} style={{ fontSize: '20px', color: '#C3CAD9' }}/>
        </button>
        <p className={styles.date}>{formatDate(startDay)} - {formatDate(endDay)}</p>
        <button className={styles.navigator} onClick={() => changeDate(false)}>
          <FontAwesomeIcon icon={faCircleChevronRight} style={{ fontSize: '20px', color: '#C3CAD9' }}/>
        </button>
      </div>
      <div className={styles.right}>
        {/* <button className={`${styles.viewButton} ${view == 'Day' ? styles.active : ''}`} onClick={() => changeView('Day')}>Day</button>
        <button className={`${styles.viewButton} ${view == 'Week' ? styles.active : ''}`} onClick={() => changeView('Week')}>Week</button>
        <button className={`${styles.viewButton} ${view == 'Month' ? styles.active : ''}`} onClick={() => changeView('Month')}>Month</button> */}
      </div>
    </div>
  )
}

export default CalendarNavBar;