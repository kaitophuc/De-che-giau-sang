import { useRef, useState, useEffect } from 'react';
import styles from './Day.module.css';
import getRandomColor from '../../../utils/getRandomColor';
import AddEvent from '../Event/AddEvent/AddEvent';

type DayProps = {
  name: string;
}

type Position = number | null;

type Event = {
  startPosition: number;
  endPosition: number;
  description: string;
  date: Date;
}

type MouseEvent = React.MouseEvent<HTMLDivElement>
type MouseButtonEvent = React.MouseEvent<HTMLButtonElement>

type Timeslot = {
  start: number;
  end: number;
}

const Day: React.FC<DayProps> = ({ name }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<Position>(null);
  const [endPosition, setEndPosition] = useState<Position>(null);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [timeslot, setTimeslot] = useState<Timeslot | null>(null);
  const [color, setColor] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // fetch('/api/events').then((response) => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // }).then((data) => {
    //   setEvents(data);
    // });
  }, [])

  const handleMouseDown = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    setIsDragging(true);
    setStartPosition(relativeY);
    setColor(getRandomColor());
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const startY = Math.min(startPosition!, relativeY);
    const endY = Math.max(startPosition!, relativeY);
    const startTime = Math.floor(startY / 50);
    const endTime = Math.floor(endY / 50);
    console.log(rect);
    console.log(relativeY, startPosition!);
    console.log(startY, endY, startTime, endTime);

    setTimeslot({
      start: startTime,
      end: endTime,
    });
  }

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;
    if (!timeslot) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    setIsDragging(false);
    setEndPosition(relativeY);
    setIsModalOpen(true);
  }

  const resetPositions = () => {
    setStartPosition(null);
    setEndPosition(null);
    setTimeslot(null);
    setIsDragging(false);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetPositions();
  }

  return (
    <div className={styles.day}>
      <h1>{name}</h1>
      <div
        className={styles.main_grid}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {timeslot && (
          <div 
            className={styles.timeslot_background}
            style={{top: `${timeslot.start * 50}px`,
                    bottom: `${1380 - (timeslot.end + 1) * 50}px`,
                    borderColor: color
            }}
          >
            
          </div>
        )}
      </div>
      <AddEvent 
        isOpen={isModalOpen}
        onClose= {handleCloseModal}
      />
    </div>
  )
}

export default Day;