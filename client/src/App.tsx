import { useEffect, useState } from 'react';
import styles from './App.module.css';
import AnswerForm from './components/AnswerForm/AnswerForm';
import AttendeeList from './components/AttendeeList/AttendeeList';
import EventResetButton from './components/EventResetButton/EventResetButton';
import Footer from './components/Footer/Footer';
import type {
  AnswerResponse,
  Attendee,
  FetchAnswersResponse,
} from './utils/types';

function App() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [eventName, setEventName] = useState('New Event');
  const [error, setError] = useState<string | null>(null);

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
        link: item.link,
        date: item.date,
      }));

      setAttendees(mappedAttendees);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch attendees');
    }
  };

  const handleEventReset = async (newEventName: string) => {
    if (!newEventName.trim()) {
      setError('Event name cannot be empty');
      return;
    }

    if (
      !window.confirm(
        'Are you sure you want to reset the attendance list and change the event name? This cannot be undone.'
      )
    ) {
      return;
    }

    setError(null);

    try {
      const response = await fetch('/answers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEventName(newEventName);
      setAttendees([]);
    } catch (error) {
      console.error('Failed to reset event:', error);
      setError('Failed to reset event. Please try again.');
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  return (
    <>
      <div className={styles.appContainer}>
        <h1 className={styles.eventName}>{eventName}</h1>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.main}>
          <AnswerForm />
          <AttendeeList attendees={attendees} />
        </div>
        <EventResetButton
          onEventReset={handleEventReset}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
