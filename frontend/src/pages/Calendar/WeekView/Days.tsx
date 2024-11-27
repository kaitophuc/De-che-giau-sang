import { useState, useEffect, useRef } from 'react';
import styles from './Days.module.css';
import { useLocalStorage } from '../../Auth/hooks/useLocalStorage';

type DaysProps = {
  startDay: Date | undefined;
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

const Days: React.FC<DaysProps> = ({startDay, viewEvent}) => {
  const [events, setEvents] = useState<Array<Event>>([]);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    if (startDay) {
      const startDayString = startDay.toISOString();
      let endDay = new Date(startDay);
      endDay.setDate(startDay.getDate() + 7);
      endDay.setSeconds(startDay.getSeconds() - 1);
      const endDayString = endDay.toISOString();

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
        // console.log(events);
      });
    }
  }, [startDay]);

  const handleEventClick = (event: Event) => {
    console.log('You clicked on event:', event);
    viewEvent(event);
  }

  return (
    <div className={styles.calendar_week}>
      {events.map((event) => {
        const dateInt = event.startTime.getDay() == 0 ? 6 : event.startTime.getDay() - 1;
        const startHour = event.startTime.getHours();
        const startMinute = event.startTime.getMinutes();
        const endHour = event.endTime.getHours();
        const endMinute = event.endTime.getMinutes();
        console.log(dateInt, startHour, startMinute, endHour, endMinute);

        const top = (startHour + startMinute / 60) * 50;
        const bottom = 1330 - (endHour + endMinute / 60) * 50;
        const left = `calc(100% * ${dateInt} / 7 + 4px)`;
        const right = `calc(100% - (100% * (${dateInt + 1}) / 7 - 1px))`;
  
        return (
          <div
            key={event._id}
            className={styles.event}
            style={{
              top: `${top}px`,
              bottom: `${bottom - 3}px`,
              left: left,
              right: right,
            }}
            onClick={() => handleEventClick(event)}
          >
            <p>{event.title}</p>
            {/* <p>{new Date(event.startTime).toDateString()}</p>
            <p>{new Date(event.endTime).toDateString()}</p>
            <p>{event.description}</p>
            <p>{event.place}</p> */}
          </div>
        )
      })}
    </div>
  )
}

export default Days;