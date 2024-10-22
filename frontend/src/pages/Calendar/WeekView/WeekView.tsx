import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import Days from './Days';
import styles from './WeekView.module.css';

const WeekView = () => {
  const [startDay, setStartDay] = useState<Date>();
  const [endDay, setEndDay] = useState<Date>();

  useEffect(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6 : 1);
    const start = new Date(today.setDate(diff));
    start.setHours(0, 0, 0, 0);
    const end = new Date(today.setDate(diff + 6));
    end.setHours(23, 59, 59, 999);
    setStartDay(start);
    setEndDay(end);
  }, []);

  const hourBoxes = [];
  for (let i = 0; i < 24; i++){
    const hour = i >= 12 ? `${i > 12 ? i - 12 : i} PM` : `${i == 0 ? 12 : i} AM`;
    hourBoxes.push(
      <div className={styles.hourBox} key={i}>
        {hour}
      </div>
    )
  }

  const hourLines = [];
  for (let i = 0; i <= 25; i++){
    const hourLinePosition = `${i * 50}px`;
    hourLines.push(
      <div className={styles.hourLine}
        style={{top: hourLinePosition}}
        key={i}
      ></div>
    )
  }

  const dayAndDates = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (let i = 0; i < 7; i++){
    if (!startDay) return null;

    const start = new Date(startDay);
    start.setDate(startDay.getDate() + i);
    const formattedDate = start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    dayAndDates.push(
      <div className={`${styles.header_element} ${styles.calendar_day}`} key={i}>
        <div>{days[i]} {formattedDate}</div>
      </div>
    )
  }

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header}>
        <div className={`${styles.header_element} ${styles.calendar_clock}`}><FontAwesomeIcon icon={faClock}/></div>
        {dayAndDates}
      </div>
      <div className={styles.calendar_main}>
        {hourLines}
        <div className={styles.calendar_sideTime}>{hourBoxes}</div>
        <Days startDay={startDay} endDay={endDay}/>
      </div>
      {/* <div className={styles.calendar_main}>
        <Day name="Monday"/>
        <Day name="Tuesday"/>
        <Day name="Wednesday"/>
        <Day name="Thursday"/>
        <Day name="Friday"/>
        <Day name="Saturday"/>
        <Day name="Sunday"/>
      </div> */}
    </div>
  );
}

export default WeekView;