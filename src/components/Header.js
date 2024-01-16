import '../App.css';
import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <Typography variant="h3">Recipe Finder</Typography>
      </Link>
    </div>
  );
}

export default Header;
