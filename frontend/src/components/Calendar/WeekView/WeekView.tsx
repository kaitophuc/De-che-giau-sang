import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import styles from './WeekView.module.css';

const WeekView = () => {
  useEffect(() => {
    
  }, [])

  return (
    <div className={styles.grid_container}>
      <FontAwesomeIcon icon={faClock}/>
      <h1>Monday</h1>
      <h1>Tuesday</h1>
      <h1>Wednesday</h1>
      <h1>Thursday</h1>
      <h1>Friday</h1>
      <h1>Saturday</h1>
      <h1>Sunday</h1>
      <div></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
      <div className={styles.day}></div>
    </div>
  );
}

export default WeekView;