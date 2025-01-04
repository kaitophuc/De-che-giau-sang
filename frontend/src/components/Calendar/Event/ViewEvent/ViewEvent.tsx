import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import styles from './ViewEvent.module.css';

interface ViewEventModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  title?: string
}

Modal.setAppElement('#root');

const ViewEvent: React.FC<ViewEventModalProps> = ({ event, isOpen, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDay, setStartDay] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  
  // const [selectedFriend, setSelectedFriend] = useState<string>('');

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setPlace(event.place || '');
      setDescription(event.description || '');
      setStartDay(event.startTime ? event.startTime.toISOString().split('T')[0] : '');
      setStartTime(event.startTime || '');
      setEndTime(event.endTime || '');
      setTags(event.tags || []);
    }
  }, [event]);

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value);
    }
  
    const handleTagCreate = () => {
      if (tagInput) {
        setTags([...tags, tagInput]);
      }
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleTagCreate();
        setTagInput('');
      }
    };
  
    const handleDeleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
      const tag = e.currentTarget.parentElement!.textContent;
      setTags(tags.filter(t => t !== tag));
    }
  
  const handleSave = async (e: any) => {
    e.preventDefault();

    // Create URL with query parameters
    const url = new URL('http://localhost:5050/api/calendar/event');
    const params = new URLSearchParams({
      id: event._id,
      title: title,
      place: place,
      startTime: startTime!.toISOString(),
      endTime: endTime!.toISOString(),
      description: description,
      tags: tags.join(','),
    });
    url.search = params.toString();

    try {
      console.log(localStorage.getItem('user'));

      const response = await fetch(url.toString(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        await response.json().then((errorData) => {
          throw new Error(`${response.status} ${errorData.message}`);
        })
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();

    // Create URL with query parameters
    const url = new URL('http://localhost:5050/api/calendar/event');
    const params = new URLSearchParams({
      id: event._id,
    });
    url.search = params.toString();

    try {
      const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).authToken}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`); // Error handling
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
              startTime ? startTime.getHours().toString().padStart(2, '0') + ":" + startTime.getMinutes().toString().padStart(2, '0') : ''
            }
            onChange={(e) => setStartTime(new Date(`${startDay}T${e.target.value}`))}
          />
          <input
            type="text"
            id="endTime"
            placeholder="To"
            onFocus={(e) => e.target.type = 'time'}
            value={
              endTime ? endTime.getHours().toString().padStart(2, '0') + ":" + endTime.getMinutes().toString().padStart(2, '0') : ''
            }
            onChange={(e) => setEndTime(new Date(`${startDay}T${e.target.value}`))}
          />
        </div>
        {/* <div className={styles.friendSelect}>
          <select
            id="friendSelect"
            value={selectedFriend}
            onChange={(e) => setSelectedFriend(e.target.value)}
            className={styles.friendDropdown}
          >
            <option value="" disabled>Select a friend</option>
            <option value="khanh">Khanh</option>
          </select>
        </div> */}
        <div className={styles.tagContainer}>
          <input
            type="text"
            id="tagInput"
            placeholder="Add or search tags"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.currentTags}>
            {tags.map(tag => (
              <div className={styles.tag} key={tag}>
                {tag}
                <button onClick={handleDeleteTag} style={{ marginLeft: '7px', marginRight: '3px' }}>
                  <FontAwesomeIcon icon={faCircleXmark} size="sm" style={{ color: 'rgb(195, 202, 217)'}} />
                </button>
              </div>
            ))}
          </div>
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