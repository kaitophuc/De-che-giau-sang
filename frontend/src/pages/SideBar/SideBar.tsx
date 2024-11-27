import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faBars, } from "@fortawesome/free-solid-svg-icons";

import styles from './SideBar.module.css';

interface CalendarIcon {
  fill: string;
}

interface ProfileIcon {
  fill: string;
}

interface MessagesIcon {
  fill: string;
}

const CalendarIcon: React.FC<CalendarIcon> = (props) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill={props.fill} stroke="current" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.3144 7.92985H22.298V6.91341C22.298 6.35437 21.8406 5.89697 21.2816 5.89697C20.7225 5.89697 20.2651 6.35437 20.2651 6.91341V7.92985H12.1336V6.91341C12.1336 6.35437 11.6762 5.89697 11.1172 5.89697C10.5581 5.89697 10.1007 6.35437 10.1007 6.91341V7.92985H9.08427C7.95602 7.92985 7.06156 8.84465 7.06156 9.96273L7.05139 24.1929C7.05139 25.311 7.95602 26.2258 9.08427 26.2258H23.3144C24.4325 26.2258 25.3473 25.311 25.3473 24.1929V9.96273C25.3473 8.84465 24.4325 7.92985 23.3144 7.92985ZM23.3144 23.1765C23.3144 23.7356 22.857 24.1929 22.298 24.1929H10.1007C9.54168 24.1929 9.08428 23.7356 9.08428 23.1765V13.0121H23.3144V23.1765ZM11.1172 15.045H13.15V17.0779H11.1172V15.045ZM15.1829 15.045H17.2158V17.0779H15.1829V15.045ZM19.2487 15.045H21.2816V17.0779H19.2487V15.045Z" />
    </svg>
  );
}

const ProfileIcon: React.FC<ProfileIcon> = (props) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill={props.fill} stroke="current" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.3144 7.92985H22.298V6.91341C22.298 6.35437 21.8406 5.89697 21.2816 5.89697C20.7225 5.89697 20.2651 6.35437 20.2651 6.91341V7.92985H12.1336V6.91341C12.1336 6.35437 11.6762 5.89697 11.1172 5.89697C10.5581 5.89697 10.1007 6.35437 10.1007 6.91341V7.92985H9.08427C7.95602 7.92985 7.06156 8.84465 7.06156 9.96273L7.05139 24.1929C7.05139 25.311 7.95602 26.2258 9.08427 26.2258H23.3144C24.4325 26.2258 25.3473 25.311 25.3473 24.1929V9.96273C25.3473 8.84465 24.4325 7.92985 23.3144 7.92985ZM23.3144 23.1765C23.3144 23.7356 22.857 24.1929 22.298 24.1929H10.1007C9.54168 24.1929 9.08428 23.7356 9.08428 23.1765V13.0121H23.3144V23.1765ZM11.1172 15.045H13.15V17.0779H11.1172V15.045ZM15.1829 15.045H17.2158V17.0779H15.1829V15.045ZM19.2487 15.045H21.2816V17.0779H19.2487V15.045Z" />
    </svg>
  )
}

const MessagesIcon: React.FC<MessagesIcon> = (props) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill={props.fill} stroke="current" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.3144 7.92985H22.298V6.91341C22.298 6.35437 21.8406 5.89697 21.2816 5.89697C20.7225 5.89697 20.2651 6.35437 20.2651 6.91341V7.92985H12.1336V6.91341C12.1336 6.35437 11.6762 5.89697 11.1172 5.89697C10.5581 5.89697 10.1007 6.35437 10.1007 6.91341V7.92985H9.08427C7.95602 7.92985 7.06156 8.84465 7.06156 9.96273L7.05139 24.1929C7.05139 25.311 7.95602 26.2258 9.08427 26.2258H23.3144C24.4325 26.2258 25.3473 25.311 25.3473 24.1929V9.96273C25.3473 8.84465 24.4325 7.92985 23.3144 7.92985ZM23.3144 23.1765C23.3144 23.7356 22.857 24.1929 22.298 24.1929H10.1007C9.54168 24.1929 9.08428 23.7356 9.08428 23.1765V13.0121H23.3144V23.1765ZM11.1172 15.045H13.15V17.0779H11.1172V15.045ZM15.1829 15.045H17.2158V17.0779H15.1829V15.045ZM19.2487 15.045H21.2816V17.0779H19.2487V15.045Z" />
    </svg>
  )
}

interface SideBarProps {
  showSideBar: () => void;
  sideBar: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ showSideBar, sideBar}) => {
  // const [sidebar, setSideBar] = useState(false);
  const [showText, setShowText] = useState(false);

  // const showSideBar = () => setSideBar(!sideBar);

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
          <FontAwesomeIcon icon={faBars} className={`${styles.icon_color} ${styles.icon_margin}`}/>
        </button>
        <span>{showText ? "Dashboard" : null}</span>
      </div>
      <ul>
        <li className={styles.page}>
          <Link to="/calendar" className={styles.flex_row}>
            <CalendarIcon fill="rgb(195, 202, 217)"/>
            <span className={styles.page_name}>{showText ? "Calendar" : null}</span>
          </Link>
        </li>
        <li className={styles.page}>
          <Link to="/profile" className={styles.flex_row}>
            <ProfileIcon fill="rgb(195, 202, 217)"/>
            <span className={styles.page_name}>{showText ? "Profile" : null}</span>
          </Link>
        </li>
        <li className={styles.page}>
          <Link to="/messages" className={styles.flex_row}>
            <MessagesIcon fill="rgb(195, 202, 217)"/>
            <span className={styles.page_name}>{showText ? "Messages" : null}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;