import { useState, useEffect } from 'react';

import CalendarNavBar from './CalendarNavBar/CalendarNavBar';
import styles from './Calendar.module.css';
import WeekView from './WeekView/WeekView';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import AddEvent from './Event/AddEvent/AddEvent';

const Calendar = () => {
  const [sideBar, setSideBar] = useState(false);
  const [startDay, setStartDay] = useState<Date> ();
  const [view, setView] = useState('Week');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6 : 1);
    const start = new Date(today.setDate(diff));
    start.setHours(0, 0, 0, 0);
    setStartDay(start);
  }, []);

  useEffect(() => {
    
  }, [startDay])

  const showSideBar = () => {
    setSideBar(!sideBar);
  }

  const changeView = (view: string) => {
    setView(view);
  }

  const changeDate = (isBackward: boolean) => {
    const date = new Date(startDay!)
    if (view == 'Day') {
      date.setDate(date.getDate() + (isBackward ? -1 : 1));
      setStartDay(date);
    } else if (view == 'Week') {
      date.setDate(date.getDate() + (isBackward ? -7 : 7));
      setStartDay(date);
    } else if (view == 'Month') {
      date.setMonth(date.getMonth() + (isBackward ? -1 : 1));
      setStartDay(date);
    }
  }

  const newEvent = () => {
    console.log('New event');
    setIsModalOpen(true);
  }

  return (
    <div className={styles.screen}>
      <SideBar showSideBar={showSideBar} sideBar={sideBar}/>
      <div className={styles.nav}>
        <NavBar />
        <div className={styles.main}>
          <div className={styles.calendar}>
            <CalendarNavBar view={view} startDay={startDay} changeView={changeView} changeDate={changeDate} newEvent={newEvent}/>
            <WeekView startDay={startDay}/>
          </div>
        </div>
      </div>
      <AddEvent 
        isOpen={isModalOpen}
        onClose= {() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Calendar;