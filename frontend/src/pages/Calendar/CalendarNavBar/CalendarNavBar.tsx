import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from './CalendarNavBar.module.css';
import AddEvent from '../Event/AddEvent/AddEvent.tsx';

interface CalendarNavBarProps {
  view: string;
  startDay: Date | undefined;
  changeView: (view: string) => void;
  changeDate: (isBackward: boolean) => void;
  newEvent: () => void;
}

const CalendarNavBar: React.FC<CalendarNavBarProps> = ({view, startDay, changeView, changeDate, newEvent}) => {
  const [endDay, setEndDay] = useState<Date | undefined>(undefined);

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

  return (
    <div className={styles.calendar_navbar}>
      <div className={styles.left}>
        <button className={`${styles.addButton}`} onClick={newEvent}>New event</button>
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