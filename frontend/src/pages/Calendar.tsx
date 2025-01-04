import { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import { useLocalStorage } from '../hooks/useLocalStorage';

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

const Calendar = () => {
  const [sideBar, setSideBar] = useState(false);
  const [startDay, setStartDay] = useState<Date> ();
  const [view, setView] = useState('Week');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  // checks if the view event modal is open
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);
  const [openedEvent, setOpenedEvent] = useState<Event | null>(null);

  const [events, setEvents] = useState<Array<Event>>([]);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6 : 1);
    const start = new Date(today.setDate(diff));
    start.setHours(0, 0, 0, 0);
    setStartDay(start);
  }, []);

  useEffect(() => {
    if (startDay) {
      const startDayString = startDay.toISOString();
      let endDay = new Date(startDay);
      endDay.setDate(startDay.getDate() + 7);
      endDay.setSeconds(startDay.getSeconds() - 1);
      const endDayString = endDay.toISOString();

      console.log(startDay);
      console.log(endDay);

      const user = getItem('user');
      const authToken = user ? JSON.parse(user).authToken : null;

      fetch(`/api/calendar/event?startTime=${startDayString}&endTime=${endDayString}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          }
        }
      ).then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(`${response.status} ${errorData.message}`);
          });
        }
        return response.json();
      }).then((data) => {
        const processedData = data.map((event: any) => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
        }));
        setEvents(processedData);
        console.log(events);
      });
    }
  }, [startDay, isAddEventOpen, isViewEventOpen]);

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
    setIsAddEventOpen(true);
  }

  const viewEvent = (event: Event) => {
    console.log('Viewing event: ', event);
    setIsViewEventOpen(true);
    setOpenedEvent(event);
  }

  const onCloseAddEvent = () => {
    setIsAddEventOpen(false);
  }

  const onCloseViewEvent = () => {
    setOpenedEvent(null);
    setIsViewEventOpen(false);
  }

  return (
    <div className={styles.screen}>
      <SideBar showSideBar={showSideBar} sideBar={sideBar}/>
      <div className={styles.nav}>
        <NavBar />
        <div className={styles.main}>
          <div className={styles.calendar}>
            <CalendarNavBar view={view} startDay={startDay} changeView={changeView} changeDate={changeDate} newEvent={newEvent}/>
            <WeekView startDay={startDay} viewEvent={viewEvent} events={events}/>
          </div>
        </div>
      </div>
      <AddEvent 
        isOpen={isAddEventOpen}
        onClose= {onCloseAddEvent}
      />
      <ViewEvent
        event={openedEvent}
        isOpen={isViewEventOpen}
        onClose= {onCloseViewEvent}
      />
    </div>
  )
}

export default Calendar;