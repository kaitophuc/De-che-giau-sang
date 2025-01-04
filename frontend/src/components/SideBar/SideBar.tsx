import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faBars, faListCheck} from "@fortawesome/free-solid-svg-icons";

import styles from './SideBar.module.css';

interface SideBarProps {
  showSideBar: () => void;
  sideBar: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ showSideBar, sideBar}) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (sideBar) {
      const timer = setTimeout(() => setShowText(true), 225);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [sideBar])

  return (
    <div className={`${styles.sidebar} ${sideBar ? styles.sidebar_expanded : styles.sidebar_collapsed}`}>
      <div className={styles.top}>
        <button onClick={showSideBar}>
          <FontAwesomeIcon icon={faBars} className={styles.icon_color} size="lg"/>
        </button>
        <span className={styles.page_name}>{showText ? "Dashboard" : null}</span>
      </div>
      <ul>
        <li className={styles.page}>
          <Link to="/" className={styles.flex_row}>
            <FontAwesomeIcon icon={faCalendarDays} className={styles.icon_color} size="lg"/>
            <span className={styles.page_name}>{showText ? "Calendar" : null}</span>
          </Link>
        </li>
        <li className={styles.page}>
          <Link to="/tasks" className={styles.flex_row}>
            <FontAwesomeIcon icon={faListCheck} className={styles.icon_color} size="lg"/>
            <span className={styles.page_name}>{showText ? "Tasks" : null}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;