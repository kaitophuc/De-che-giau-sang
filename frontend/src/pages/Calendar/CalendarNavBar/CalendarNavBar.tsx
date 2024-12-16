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
    // fetch('http://localhost:5050/api/auth/sync', {
    // fetch('http://localhost:5050/api/auth/google', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`,
    //   },
    //   credentials: 'include',
    // }).then(response => {
    //   console.log(response);
    //   if (response.ok) {
    //     console.log('Successfully synced with Google Calendar');
    //   } else {
    //     console.log('Failed to sync with Google Calendar');
    //   }
    // })
    // await fetch('http://localhost:5050/api/auth/sync/google', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`,
    //   },
    //   credentials: 'include',
    // })
    // console.log(`Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`);
    // const response = await fetch('/api/auth/verify-token', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`,
    //   },
    //   credentials: 'include',
    // })
    // const data = await response.json();
    // if (data.success) {
    //   console.log(data.user);
    //   window.location.href = `http://localhost:5050/api/auth/google/sync/${data.user._id}`;
    //   console.log('Successfully synced with Google Calendar');
    // } else {
    //   console.log('Failed to sync with Google Calendar');
    // }
    // window.location.href = 'http://localhost:5050/api/auth/google';
    // console.log("Verify Google token...")
    // console.log(`Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`);
    // const response = await fetch('/api/auth/verify-google', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`,
    //   },
    //   credentials: 'include',
    // })
    // const data = await response.json();
    // // if (data.success) {
    // if (data.success) {
    //   console.log(data);
    //   console.log("Syncing with Google Calendar...");
    //   // const response = await fetch('/api/calendar/sync-google', {
    //   //   method: 'GET',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`,
    //   //   },
    //   //   credentials: 'include',
    //   // })
    //   // const data = await response.json();
    //   // console.log(data);
    //   // window.location.href = 'http://localhost:5050/api/calendar/sync-google';
    // } else {
    //   console.log('Failed to sync with Google Calendar');
    // }
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

  return (
    <div className={styles.calendar_navbar}>
      <div className={styles.left}>
        <button className={`${styles.leftButton}`} onClick={newEvent}>New event</button>
        <div className={styles.syncButtonContainer}>
          <button className={`${styles.leftButton} ${showDropdown ? styles.syncButtonActive : styles.syncButtonInactive}`} onClick={toggleDropdown}>Sync</button>
          {showDropdown && (
            <div className={styles.dropdown}>
              <ul>
                <li><button onClick={syncGoogle}>Sync with Google Calendar</button></li>
                <li>Sync with Outlook</li>
              </ul>
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
        <button className={`${styles.viewButton} ${view == 'Day' ? styles.active : ''}`} onClick={() => changeView('Day')}>Day</button>
        <button className={`${styles.viewButton} ${view == 'Week' ? styles.active : ''}`} onClick={() => changeView('Week')}>Week</button>
        <button className={`${styles.viewButton} ${view == 'Month' ? styles.active : ''}`} onClick={() => changeView('Month')}>Month</button>
      </div>
    </div>
  )
}

export default CalendarNavBar;