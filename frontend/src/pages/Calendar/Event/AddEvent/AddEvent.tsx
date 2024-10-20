import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './AddEvent.module.css';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

Modal.setAppElement('#root');

const AddEvent: React.FC<EventModalProps> = ({ isOpen, onClose }) => {
  const [title, setEventTitle] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedFriend, setSelectedFriend] = useState<string>('');

  const handleSave = async (e: any) => {
    e.preventDefault();

    const data = {
      title: title,
      place: place,
      start_date: new Date(startDate).toISOString(), // Ensure valid date format
      end_date: new Date(endDate).toISOString(), // Ensure valid date format
      description: description
    };

    // Create URL with query parameters
    const url = new URL('http://localhost:5050/new_event');
    const params = new URLSearchParams({
      title: title,
      place: place,
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
      description: description
    });
    url.search = params.toString();

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      onClose();
    } catch (error) {
      console.error(error);
    }
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
            className={styles.titleInput}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </div>
        <div className={styles.place}>
          <input
            type="text"
            id="place"
            placeholder="Place"
            className={styles.placeInput}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div className={styles.date}>
          <input
            type="text"
            id="startDate"
            placeholder="Start Date"
            onFocus={(e) => e.target.type = 'datetime-local'}
            // onBlur={(e) => e.target.type = 'text'}
            className={styles.startTime}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="text"
            id="endDate"
            placeholder="End Date"
            onFocus={(e) => e.target.type = 'datetime-local'}
            // onBlur={(e) => e.target.type = 'text'}
            className={styles.endTime}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={styles.friendSelect}>
          <select
            id = "friendSelect"
            value={selectedFriend}
            onChange={(e) => setSelectedFriend(e.target.value)}
            className={styles.friendDropdown}
          >
            <option value="" disabled>Select a friend</option>
          </select>
        </div>
        <div className={styles.description}>
          <input
            type="text"
            id="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.button}>
          <button onClick={onClose} className={styles.closeButton}>
            Close <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
          <button onClick={handleSave} className={styles.submitButton}>
            Save <FontAwesomeIcon icon={faCheck} size="lg" />
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddEvent;