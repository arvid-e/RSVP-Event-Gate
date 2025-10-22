import React, { useState } from 'react';
import styles from './EventResetButton.module.css';

interface EventResetProps {
  onEventReset: (newName: string) => void;
  isLoading?: boolean;
}

const EventResetButton: React.FC<EventResetProps> = ({
  onEventReset,
  isLoading = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEventName, setNewEventName] = useState('');

  const handleConfirm = () => {
    if (!newEventName.trim()) {
      return;
    }
    onEventReset(newEventName);
    setNewEventName('');
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        className={styles.resetButton}
      >
        Reset Event & Name
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.title}>Confirm Event Reset</h3>
            <p className={styles.warning}>
              This action will clear the entire attendee list and update the
              event name.
            </p>

            <div className={styles.formGroup}>
              <label htmlFor="newEventName" className={styles.label}>
                New Event Name:
              </label>
              <input
                id="newEventName"
                type="text"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                placeholder="Enter new event name"
                disabled={isLoading}
                className={styles.input}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                onClick={handleConfirm}
                disabled={isLoading || !newEventName.trim()}
                className={`${styles.button} ${styles.confirmButton}`}
              >
                {isLoading ? 'Resetting...' : 'Confirm Reset'}
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
                className={`${styles.button} ${styles.cancelButton}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventResetButton;
