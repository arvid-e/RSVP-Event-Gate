import { List } from 'lucide-react';
import React from 'react';
import type { Attendee } from '../../utils/types';
import styles from './AttendeeList.module.css';

interface AttendeeListProps {
  attendees: Attendee[];
}

const AttendeeList: React.FC<AttendeeListProps> = ({ attendees }) => {
  return (
    <>
      <div className={styles['list-container']}>
        <h2 className={styles['list-header']}>
          <List className={styles['header-icon']} />
          Attendees ({attendees.length})
        </h2>
        <div className={styles['list-wrapper']}>
          {attendees.length > 0 ? (
            attendees.map((attendee, index) => (
              <div
                key={attendee.id || index}
                className={styles['attendee-item']}
              >
                <div className={styles['attendee-info-group']}>
                  <div>
                    <p className={styles['name-text']}>{attendee.name}</p>

                    <p className={styles['email-text']}>
                      🖂
                      <span className={styles['email-icon']} />
                      <span className={styles['scroll-content']}>
                        {attendee.email}
                      </span>
                    </p>

                    <p className={styles['link-text']}>
                      🌐
                      <span className={styles['link-icon']} />
                      <span className={styles['scroll-content']}>
                        {attendee.link}
                      </span>
                    </p>

                    <p>Answered:</p>
                    <p className={styles['date-text']}>{attendee.date}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles['no-registrations-text']}>
              No one has registered yet. Be the first!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AttendeeList;
