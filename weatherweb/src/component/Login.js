import React, { useState } from 'react';
import axios from "axios";
import '../css/Login.css';
import mail from '../background/mail.png';
import padlock from '../background/padlock.png';
import user from '../background/user.png';

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthentication = async () => {
    try {
      if (action === 'Login') {
       
        const response = await axios.post('http://localhost:3001/api/user', {
          email: email,
          password: password,
        });
        
        console.log(response.data);
        setUser(response.data.user);
      } else {
        
        const response = await axios.post('http://localhost:3001/api/user', {
          name: name,
          email: email,
          password: password,
        });
        
        console.log(response.data);
      }
    } catch (error) {

      console.error('Authentication error:', error);
    }
  };

  return (
    <div className='loginSignup'>
      <div className='loginheader'>
        <div className='text'>{action} </div>
        <div className='underline'></div>
      </div>
      <div className='loginputs'>
        {action === 'Login' ? null : (
          <div className='inputs'>
            <img src={user} alt='' />
            <input
              type='text'
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className='inputs'>
          <img src={mail} alt='' />
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='inputs'>
          <img src={padlock} alt='' />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className='submit-container'>
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction('Sign Up');
          }}
        >
          Sign Up{' '}
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => {
            handleAuthentication();
          }}
        >
          {action === 'Sign Up' ? 'Login' : 'Submit'}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
