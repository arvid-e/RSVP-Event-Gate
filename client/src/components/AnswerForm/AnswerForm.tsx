import type { ChangeEvent } from 'react';
import { useState } from 'react';
import styles from './AnswerForm.module.css';

interface FormState {
  name: string;
  email: string;
  password: string;
  link: string;
  date: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  password: "",
  link: "",
  date: ""
};

function AnswerForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormState(prev => {
      const newState = {
        ...prev,
        [name]: value,
      };
      
      return newState;
    });
  }

  const { name, email, password, link } = formState;

  return (
    <form id={styles['answer-form']}>
      <h3>Answer Form</h3>

      <label htmlFor='name' className={styles['answer-form-label']}>
        Name
      </label>
        <input className={styles['answer-form-input']}
          name='name'
          id='name'
          type="text" 
          value={name}
          onChange={handleChange}
        />

      <label htmlFor='email' className={styles['answer-form-label']}>
        Email
      </label>
        <input className={styles['answer-form-input']}
          name='email'
          id='email'
          type="text" 
          value={email}
          onChange={handleChange}
        />
      

      <label htmlFor='password' className={styles['answer-form-label']}>
        Password
      </label>
        <input className={styles['answer-form-input']}
          name='password'
          id='password'
          type="text" 
          value={password}
          onChange={handleChange}
        />
      

      <label htmlFor='link' className={styles['answer-form-label']}>
        Link
      </label>
        <input className={styles['answer-form-input']}
          name='link'
          id='link'
          type="text" 
          value={link}
          onChange={handleChange}
        />

    </form>
  )
}

export default AnswerForm;