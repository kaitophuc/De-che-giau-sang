import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import Days from './Days';
import styles from './WeekView.module.css';

interface WeekViewProps {
  startDay: Date | undefined;
}

const WeekView: React.FC<WeekViewProps> = ({startDay, viewEvent}) => {
  const [currentTime, setCurrentTime] = useState<number>();

  useEffect(() => {
    const currentDay = new Date();
    setCurrentTime(currentDay.getHours() * 60 * 60 + currentDay.getMinutes() * 60 + currentDay.getSeconds());
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
  for (let i = 1; i <= 25; i++){
    const hourLinePosition = `${i * 50}px`;
    hourLines.push(
      <div className={styles.hourLine}
        style={{top: hourLinePosition}}
        key={i}
      ></div>
    )
  }

  const dayLines = [];
  for (let i = 0; i <= 7; i++){
    const dayLinePosition = `calc((10% - 0.727px) + (90% - 6.543px) * ${i} / 7)`;
    dayLines.push(
      <div className={styles.dayLine}
        style={{left: dayLinePosition}}
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
    const formattedDate = start.toLocaleDateString(undefined, { day: 'numeric' });
    dayAndDates.push(
      <div className={`${styles.header_element} ${styles.calendar_day}`} key={i}>
        <div>{days[i]} {formattedDate}</div>
      </div>
    )
  }

  const sameWeek = (date1: Date, date2: Date) => {
    const startOfWeek = (date: Date) => {
      date.setHours(0, 0, 0, 0);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    };

    const start1 = startOfWeek(new Date(date1));
    const start2 = startOfWeek(new Date(date2));
    return start1.getTime() === start2.getTime();
  }

  const isSameWeek = sameWeek(startDay!, new Date());

  return (
    <div className={styles.calendar_container}>
      {isSameWeek &&
        <>
          <div className={styles.calendar_nowLine}></div>
          <div className={`${styles.dot} ${styles.leftDot}`}></div>
          <div className={`${styles.dot} ${styles.rightDot}`}></div>
        </>
      }
      <div className={styles.calendar_header}>
        {dayLines}
        <div className={`${styles.header_element} ${styles.calendar_clock}`}><FontAwesomeIcon icon={faClock}/></div>
        {dayAndDates}
      </div>
      <div className={styles.calendar_main}>
        {hourLines}
        <div className={styles.calendar_sideTime}>{hourBoxes}</div>
        <Days startDay={startDay} viewEvent={viewEvent}/>
      </div>
    </div>
  );
}

export default WeekView;