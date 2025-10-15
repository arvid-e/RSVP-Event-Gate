import styles from './AnswerForm.module.css'
import { useState } from 'react';

function AnswerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");


  function handleChange(e) {
    setName(e.target.value);
    setEmail(e.target.value);
    setPassword(e.target.value);
    setLink(e.target.value);
  }

  return (
    <form id={styles['answer-form']}>
      <h3>Answer Form</h3>

      <label htmlFor='name' className={styles['answer-form-label']}>
        Name
      </label>
        <input className={styles['answer-form-input']}
          id='name'
          type="text" 
          value={name}
          onChange={handleChange}
        />

      <label htmlFor='email' className={styles['answer-form-label']}>
        Email
      </label>
        <input className={styles['answer-form-input']}
          id='email'
          type="text" 
          value={email}
          onChange={handleChange}
        />
      

      <label htmlFor='password' className={styles['answer-form-label']}>
        Password
      </label>
        <input className={styles['answer-form-input']}
          id='password'
          type="text" 
          value={password}
          onChange={handleChange}
        />
      

      <label htmlFor='link' className={styles['answer-form-label']}>
        Link
      </label>
        <input className={styles['answer-form-input']}
          id='link'
          type="text" 
          value={link}
          onChange={handleChange}
        />

    </form>
  )
}

export default AnswerForm;