import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import type { FormState, ValidationState } from '../../utils/answer-form-data';
import {
  initialFormState,
  initialValidationState,
} from '../../utils/answer-form-data';
import { validateField } from '../../utils/validation';
import styles from './AnswerForm.module.css';


function AnswerForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [validationState, setValidationState] = useState<ValidationState>(
    initialValidationState
  );

  function getInputClassName(fieldName: keyof ValidationState): string {
    const isValid = validationState[fieldName]; 

    let className = styles['answer-form-input'];

    if (isValid === false) {
      className += ` ${styles['answer-form-invalid-input']}`;
    } else if (isValid === true) {
      className += ` ${styles['answer-form-valid-input']}`;

    }

    return className; 
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    let isValid: boolean | null = validateField(name, value);

    if (value.length < 1) {
      isValid = null;
    }

    setValidationState((prev) => ({
      ...prev,
      [name]: isValid,
    }));

    setFormState((prev) => {
      const newState = {
        ...prev,
        [name]: value,
      };

      return newState;
    });

  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch('/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully! Result:', result);
      } else {
        const errorData = await response.json();

        console.error(
          'Submission failed with status:',
          response.status,
          'Error Data:',
          errorData || response.statusText
        );
      }
    } catch (error) {
      console.error('Network error during submission:', error);
    }

    setFormState(initialFormState);
  }

  const { name, email, password, link, date } = formState;

  return (
    <form id={styles['answer-form']} onSubmit={handleSubmit}>
      <h3>Answer Form</h3>

      <label htmlFor="name" className={styles['answer-form-label']}>
        Name
      </label>
      <input
        className={getInputClassName('name')}
        name="name"
        id="name"
        type="text"
        value={name}
        onChange={handleChange}
      />

      <label htmlFor="email" className={styles['answer-form-label']}>
        Email
      </label>
      <input
        className={getInputClassName('email')}
        name="email"
        id="email"
        type="text"
        value={email}
        onChange={handleChange}
      />

      <label htmlFor="password" className={styles['answer-form-label']}>
        Password
      </label>
      <input
        className={getInputClassName('password')}
        name="password"
        id="password"
        type="password"
        value={password}
        onChange={handleChange}
      />

      <label htmlFor="link" className={styles['answer-form-label']}>
        Link
      </label>
      <input
        className={getInputClassName('link')}
        name="link"
        id="link"
        type="text"
        value={link}
        onChange={handleChange}
      />

      <label htmlFor="date" className={styles['answer-form-label']}>
        Date
      </label>
      <input
        className={getInputClassName('date')}
        name="date"
        id="date"
        type="date"
        value={date}
        onChange={handleChange}
      />

      <button type="submit" className="answer-form-input">
        Submit Answer
      </button>
    </form>
  );
}

export default AnswerForm;
