import React from "react";
import "../App.css";
import { Button } from "@mui/material";

function Login() {

    return (
        <div>
            <Button style={{marginRight: "10px"}} variant="contained">Log in</Button>
            <Button style={{marginRight: "10px"}} variant="outlined">Sign up</Button>
        </div>
    )
}

export default Login;