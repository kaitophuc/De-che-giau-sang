import { useState, useEffect } from 'react';

type DaysProps = {
  startDay: Date | undefined;
  endDay: Date | undefined;
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

const Days: React.FC<DaysProps> = ({startDay, endDay}) => {
  const [events, setEvents] = useState<Array<Event>>([]);

  useEffect(() => {
    if (startDay && endDay) {
      const startDayString = startDay.toISOString();
      const endDayString = endDay.toISOString();

      fetch(`/api/calendar/event?startTime=${startDayString}&endTime=${endDayString}`).then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      }).then((data) => {
        console.log(data);
        setEvents(data);
      });
    }
  }, []);

  return (
    <div>
      {startDay!.toDateString()}
      {endDay!.toDateString()}
    </div>
  )
}

export default Days;