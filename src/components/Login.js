import React from 'react';
import '../App.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <Button style={{ marginRight: '10px' }} variant="contained">
        Log in
      </Button>
      <Link to="/signup">
        <Button style={{ marginRight: '10px' }} variant="outlined">
          Sign up
        </Button>
      </Link>
    </div>
  );
}

export default Login;
