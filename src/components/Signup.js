import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

function Signup() {
  const handleSubmit = () => {};
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}

export default Signup;
/*
const useStyles = makeStyles((theme) => ({
  formContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    marginTop: '50px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
}));

function SignupPage() {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // Retrieve form data: event.target.<fieldName>.value
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>

      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SignupPage;


*/
