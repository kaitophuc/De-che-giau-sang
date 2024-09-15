import { useRef, useState } from 'react';
import styles from './Day.module.css';

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

const Day: React.FC<DayProps> = ({name}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<Position>(null);
  const [endPosition, setEndPosition] = useState<Position>(null);
  const [position, setPosition] = useState<Position>(null);
  const [events, setEvents] = useState<Array<Event>>([]);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartPosition(e.clientY);
    setPosition(e.clientY);
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging){
      setPosition(e.clientY);
    }
  }

  const handleMouseUp = (e: MouseEvent) => {
    setIsDragging(false);
    setEndPosition(e.clientY);
    
  }

  return (
    <div className={styles.day}>
      <h1>{name}</h1>
      <div className={styles.main_grid}>
        
      </div>
    </div>
  )
}

export default Day;