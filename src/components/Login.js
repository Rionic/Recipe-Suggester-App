import React, { useState, useRef } from 'react';
import Header from './Header.js';
import { Typography, TextField, Button } from '@mui/material';

function Login() {

  const passwordRef = useRef(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!validateEmail(email)) {
      setIsValidEmail(false);
      setEmailErrorMessage('Invalid email format');
      return;
    } else {
      setIsValidEmail(true);
      setEmailErrorMessage('');
    }

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        alert('Login successful!')
        const data = await response.json();
        localStorage.setItem('token', data.token);
      } else {
        alert('Login failed!')
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

  };

  const handlePasswordBlur = () => {
    passwordRef.current?.blur();
  };

  return (
    <div>
      <Header />
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="signup">
        <TextField 
          label="Email"
          name="email"
          variant="outlined"
          required
          error={!isValidEmail}
          helperText={emailErrorMessage}
        />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          required
          type="password"
          inputRef={passwordRef}
          onBlur={handlePasswordBlur}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login;