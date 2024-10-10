import CalendarNavBar from './CalendarNavBar/CalendarNavBar';
import styles from './Calendar.module.css';
import WeekView from './WeekView/WeekView';

interface CalendarProps {
  sideBar: boolean;
}

const Calendar: React.FC<CalendarProps> = ({sideBar}) => {
  return (
    <div className={styles.calendar}>
      <CalendarNavBar />
      <WeekView/>
    </div>
  )
}

export default Calendar;