import React from 'react';
import '../App.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function LoginSignup() {
  return (
    <div style={{ position: 'absolute', right: '0px', top: '10px' }}>
      <Link to="/login">
        <Button style={{ marginRight: '10px' }} variant="contained">
          Log in
        </Button>
      </Link>
      <Link to="/signup">
        <Button style={{ marginRight: '10px' }} variant="outlined">
          Sign up
        </Button>
      </Link>
    </div>
  );
}

export default LoginSignup;
