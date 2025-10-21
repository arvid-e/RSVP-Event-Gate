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

    let className = styles['form-input'];

    if (isValid === false) {
      className += ` ${styles['form-invalid-input']}`;
    } else if (isValid === true) {
      className += ` ${styles['form-valid-input']}`;
    }

    return className;
  }

  function getSubmitButtonClassName() {
    let className = styles['form-submit-button'];

    const formIsValid = Object.values(validationState).every(
      (fieldValidState) => fieldValidState === true
    );

    if (formIsValid) {
      className += ` ${styles['form-submit-button-valid']}`;
    } else {
      className += ` ${styles['form-submit-button-invalid']}`;
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

    for (const field of Object.values(validationState)) {
      if (field !== true) {
        return;
      }
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/answers/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        }
      );

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
      console.error('Error during submission:', error);
    }

    setFormState(initialFormState);
  }

  const { name, email, password, link, date } = formState;

  return (
    <form id={styles['form']} onSubmit={handleSubmit}>
      <span className={styles['form-title']}>Answer Form</span>

      <label htmlFor="name" className={styles['form-label']}>
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

      <label htmlFor="email" className={styles['form-label']}>
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

      <label htmlFor="password" className={styles['form-label']}>
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

      <label htmlFor="link" className={styles['form-label']}>
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

      <label htmlFor="date" className={styles['form-label']}>
        Today&apos;s Date
      </label>
      <input
        className={getInputClassName('date')}
        name="date"
        id="date"
        type="date"
        value={date}
        onChange={handleChange}
      />

      <button type="submit" className={getSubmitButtonClassName()}>
        Submit Answer
      </button>
    </form>
  );
}

export default AnswerForm;
