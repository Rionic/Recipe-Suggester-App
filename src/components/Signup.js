import React from 'react';
import '../App.css';
import { Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
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
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          variant="outlined"
          required
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