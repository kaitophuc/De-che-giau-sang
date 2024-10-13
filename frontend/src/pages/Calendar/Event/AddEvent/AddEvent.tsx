import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './AddEvent.module.css';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: String,
    place: String,
    start_date: Date,
    end_date: Date,
    description: String) => void;
}

Modal.setAppElement('#root');

const AddEvent: React.FC<EventModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setEventTitle] = useState('');
  const [place, setPlace] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [description, setDescription] = useState('');


  /*const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const title = document.getElementById('eventTitle') as HTMLInputElement;
    const place = document.getElementById('place') as HTMLInputElement;
    const start_date = document.getElementById('startDate') as HTMLInputElement;
    const end_date = document.getElementById('endDate') as HTMLInputElement;
    const description = document.getElementById('description') as HTMLInputElement;

    const data = {
      title: title.value,
      place: place.value,
      start: start_date.value,
      end: endDate.value,
      description: description.value
    }

    onSave(title, place, start_date, end_date, description);
    onClose();
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      place: place,
      start_date: new Date(start_date).toISOString(), // Ensure valid date format
      end_date: new Date(end_date).toISOString(), // Ensure valid date format
      description: description
    };

    // Create URL with query parameters
    const url = new URL('http://localhost:5050/new_event');
    const params = new URLSearchParams({
      title: title,
      place: place,
      start_date: new Date(start_date).toISOString(),
      end_date: new Date(end_date).toISOString(),
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
  }

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.title}>
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
        {/* <div className={styles.friendSelect}>
          <select
            id = "friendSelect"
            value={selectedFriend}
            onChange={(e) => setSelectedFriend(e.target.value)}
            className={styles.friendDropdown}
          >
            <option value="" disabled>Select a friend</option>
          </select>
        </div> */}
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
          <button type="submit" className={styles.submitButton}>
            Save <FontAwesomeIcon icon={faCheck} size="lg" />
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddEvent;