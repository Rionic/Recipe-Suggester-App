import '../App.css';
import React from 'react';
import { Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <MuiLink component={Link} to="/" underline="none">
        <Typography variant="h3">Recipe Finder</Typography>
      </MuiLink>
    </div>
  );
}

export default Header;
