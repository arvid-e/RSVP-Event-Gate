import { List, Mail } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styles from './AttendeeList.module.css';
import type { AnswerResponse, FetchAnswersResponse, Attendee } from '../../utils/types';


const AttendeeList: React.FC = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await fetch('/answers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: HTTP ${response.status}`);
        }

        const responseData: FetchAnswersResponse = await response.json();

        if (
          responseData.status !== 'success' ||
          !responseData.data ||
          !responseData.data.answers
        ) {
          throw new Error(
            `Invalid response format from server: Server returned status: ${
              responseData.status || 'Unknown'
            }`
          );
        }

        const rawAnswers: AnswerResponse[] = responseData.data.answers;

        const mappedAttendees: Attendee[] = rawAnswers.map((item) => ({
          id: item._id || item._id,
          name: item.name,
          email: item.email,
        }));

        setAttendees(mappedAttendees);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchAttendees();
  }, []);


  return (
    <>
      <div className={`lg:col-span-1 list-container`}>
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
                <div className={styles["attendee-info-group"]}>
                  <div className={styles["initial-circle"]}>
                    {attendee.name[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className={styles["name-text"]}>{attendee.name}</p>
                    <p className={styles["email-text"]}>
                      <Mail className={styles["email-icon"]} />
                      {attendee.email}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles["no-registrations-text"]}>
              No one has registered yet. Be the first!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AttendeeList;
