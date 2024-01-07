import React, { useRef, useState } from 'react';
import '../App.css';
import { Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

function Signup() {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setPasswordErrorMessage('Passwords do not match');
    } else {
      setPasswordMatch(true);
      setPasswordErrorMessage(''); 
    }
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      setEmailErrorMessage('Invalid email format');
    } else {
      setIsValidEmail(true);
      setEmailErrorMessage('');
    }
    console.log(emailErrorMessage);
    if (passwordErrorMessage || emailErrorMessage) return;
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName, lastName, email, password}),
      });

      if (response.ok) {
        alert('Signup successful!')
      } else {
        alert('Signup failed!')
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handlePasswordChange = () => {
    confirmPasswordRef.current?.blur();
  };
  
  const handleConfirmPasswordChange = () => {
    passwordRef.current?.blur();
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit} className="signup">
        <TextField
          label="First Name"
          name="firstName"
          variant="outlined"
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          required
        />
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
          onChange={handlePasswordChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          variant="outlined"
          required
          type="password"
          inputRef={confirmPasswordRef}
          onChange={handleConfirmPasswordChange}
          error={!passwordMatch}
          helperText={passwordErrorMessage}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Signup;