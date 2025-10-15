
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
    <form id='answer-form'>
      <label className='form-labels'>Name
        <input
          type="text" 
          value={name}
          onChange={handleChange}
        />
      </label>

      <label className='form-labels'>Email
        <input
          type="text" 
          value={email}
          onChange={handleChange}
        />
      </label>

      <label className='form-labels'>Password
        <input
          type="text" 
          value={password}
          onChange={handleChange}
        />
      </label>

      <label className='form-labels'>Link
        <input
          type="text" 
          value={link}
          onChange={handleChange}
        />
      </label>

      
    </form>
  )
}

export default AnswerForm;