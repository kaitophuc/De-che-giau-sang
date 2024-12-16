import { useState, useEffect } from 'react';
import styles from './Calendar.module.css';

import CalendarNavBar from '../components/Calendar/CalendarNavBar/CalendarNavBar';
import WeekView from '../components/Calendar/WeekView/WeekView';
import NavBar from '../components/NavBar/NavBar';
import SideBar from '../components/SideBar/SideBar';
import AddEvent from '../components/Calendar/Event/AddEvent/AddEvent';
import ViewEvent from '../components/Calendar/Event/ViewEvent/ViewEvent';

type Event = {
  _id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  description: string;
  place: string;
  // color: string;
}

type Event = {
  _id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  description: string;
  place: string;
  // color: string;
}

const Calendar = () => {
  const [sideBar, setSideBar] = useState(false);
  const [startDay, setStartDay] = useState<Date> ();
  const [view, setView] = useState('Week');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // checks if the view event modal is open
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);
  const [openedEvent, setOpenedEvent] = useState<Event | null>(null);

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

  const viewEvent = (event: Event) => {
    console.log('Viewing event: ', event);
    setOpenedEvent(event);
    setIsViewEventOpen(true);
  }

  return (
    <div className={styles.screen}>
      <SideBar showSideBar={showSideBar} sideBar={sideBar}/>
      <div className={styles.nav}>
        <NavBar />
        <div className={styles.main}>
          <div className={styles.calendar}>
            <CalendarNavBar view={view} startDay={startDay} changeView={changeView} changeDate={changeDate} newEvent={newEvent}/>
            <WeekView startDay={startDay} viewEvent={viewEvent}/>
          </div>
        </div>
      </div>
      <AddEvent 
        isOpen={isModalOpen}
        onClose= {() => setIsModalOpen(false)}
      />
      <ViewEvent
        event={openedEvent}
        isOpen={isViewEventOpen}
        onClose= {() => {
          setIsViewEventOpen(false);
          setOpenedEvent(null);
        }}
      />
    </div>
  )
}

export default Calendar;