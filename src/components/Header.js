import "../App.css";
import React from "react";
import { Typography } from "@mui/material";
import Login from "./Login";

function Header() {
  return (
    <div className="header">
      <Typography variant="h3">
        Recipe Finder
      </Typography>
      <Login />
    </div>
  );
}

export default Header;
