import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import Day from './Day';
import styles from './WeekView.module.css';

const WeekView = () => {
  useEffect(() => {
    
  }, []);

  const hourBoxes = [];
  const hourLines = [];
  for (let i = 0; i < 24; i++){
    const hour = i >= 12 ? `${i > 12 ? i - 12 : i} PM` : `${i == 0 ? 12 : i} AM`;
    hourBoxes.push(
      <div className={styles.hourBox} key={i}>
        {hour}
      </div>
    )
  }

  for (let i = 0; i <= 25; i++){
    const hourLinePosition = `${i * 50}px`;
    hourLines.push(
      <div className={styles.hourLine}
        style={{top: hourLinePosition}}
        key={i}
      ></div>
    )
  }

  return (
    <div className={styles.calendar_container}>
      {hourLines}
      <div className={styles.calendar_sideTime}>{hourBoxes}</div>
      <div className={styles.calendar_main}>
        <Day name="Monday"/>
        <Day name="Tuesday"/>
        <Day name="Wednesday"/>
        <Day name="Thursday"/>
        <Day name="Friday"/>
        <Day name="Saturday"/>
        <Day name="Sunday"/>
      </div>
    </div>
  );
}

export default WeekView;