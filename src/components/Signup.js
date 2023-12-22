import React, { useRef, useState } from 'react';
import '../App.css';
import { Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

function Signup() {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName, lastName, email, password}),
      });

      if (response.ok) {
        alert('Login successful!')
      } else {
        alert('Login failed!')
      }
    } catch (error) {
      console.error('Error during login:', error);
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
        <TextField label="Email" name="email" variant="outlined" required />
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