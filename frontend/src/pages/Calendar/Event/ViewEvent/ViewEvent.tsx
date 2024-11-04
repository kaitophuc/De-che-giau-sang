import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import styles from './ViewEvent.module.css';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  title?: string
  
}

Modal.setAppElement('#root');

const ViewEvent: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  if (event === null){
    return null;
  }

  const [title, setTitle] = useState<string>(event.title || '');
  const [place, setPlace] = useState<string>(event.place || '');
  const [description, setDescription] = useState<string>(event.description || '');
  const [startDay, setStartDay] = useState<string>(event.startTime.toISOString().split('T')[0] || '');
  const [startTime, setStartTime] = useState<string>(event.startTime || '');
  const [endTime, setEndTime] = useState<string>(event.endTime || '');
  const [selectedFriend, setSelectedFriend] = useState<string>('');

  console.log("ViewEvent:", event);
  const handleSave = async (e: any) => {
    /*e.preventDefault();

    const startDateTime = new Date(`${startDay}T${startTime}`);
    const endDateTime = new Date(`${startDay}T${endTime}`);

    // Create URL with query parameters
    const url = new URL('http://localhost:5050/api/calendar/event');
    const params = new URLSearchParams({
      title: title,
      place: place,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      description: description
    });
    url.search = params.toString();

    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`); // Error handling
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      onClose();
    } catch (error) {
      console.error(error);
    }*/
   onClose();
  };

  const handleDelete = async (e: any) => {
    console.log('Pls implement delete event!');
    onClose();
    /*e.preventDefault();

    const startDateTime = new Date(`${startDay}T${startTime}`);
    const endDateTime = new Date(`${startDay}T${endTime}`);

    // Create URL with query parameters
    const url = new URL('http://localhost:5050/api/calendar/event');
    const params = new URLSearchParams({
      title: title,
      place: place,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      description: description
    });
    url.search = params.toString();

    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`); // Error handling
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      onClose();
    } catch (error) {
      console.error(error);
    }*/
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.form}>
        <div className={styles.header}>
          <input
            type="text"
            id="title"
            placeholder="Event Title"
            value={title}
            className={styles.titleInput}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.place}>
          <input
            type="text"
            id="place"
            placeholder="Place"
            value={place}
            className={styles.placeInput}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div className={styles.date}>
          <input
            type="text"
            id="startDay"
            placeholder="Start Date"
            onFocus={(e) => e.target.type = 'date'}
            className={styles.borderRight}
            value={startDay}
            onChange={(e) => setStartDay(e.target.value)}
          />
          <input
            type="text"
            id="startTime"
            placeholder="From"
            onFocus={(e) => e.target.type = 'time'}
            className={styles.borderRight}
            value={
              event.startTime.getHours().toString().padStart(2, '0') + ":" + event.startTime.getMinutes().toString().padStart(2, '0')
            }
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          />
          <input
            type="text"
            id="endTime"
            placeholder="To"
            onFocus={(e) => e.target.type = 'time'}
            value={
              event.endTime.getHours().toString().padStart(2, '0') + ":" + event.endTime.getMinutes().toString().padStart(2, '0')
            }
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className={styles.friendSelect}>
          <select
            id="friendSelect"
            value={selectedFriend}
            onChange={(e) => setSelectedFriend(e.target.value)}
            className={styles.friendDropdown}
          >
            <option value="" disabled>Select a friend</option>
            <option value="khanh">Khanh</option>
          </select>
        </div>
        <div className={styles.description}>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.button}>
          <button onClick={handleDelete} className={styles.closeButton}>
            Delete <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
          <button onClick={handleSave} className={styles.submitButton}>
            Save <FontAwesomeIcon icon={faCheck} size="lg" />
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ViewEvent;