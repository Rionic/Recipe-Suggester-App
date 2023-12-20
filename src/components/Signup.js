import React, { useRef } from 'react';
import '../App.css';
import { Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

function Signup() {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
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