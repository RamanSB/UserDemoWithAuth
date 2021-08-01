import React from 'react';
import { Button, Typography } from '@material-ui/core';

function Main() {
    return (
        <div style={{width: "inherit", height: "inherit", display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Typography variant="h3" style={{alignSelf: "center", marginBottom: "5%"}}>Hi x</Typography>
            <Button variant="contained" style={{height: "8em", width: "8em", alignSelf: "center", borderRadius: "4em", background: "conic-gradient(red, blue, green, yellow, orange, black, white, purple)"}}><Typography variant="overline" style={{color: "white"}}></Typography></Button>
            <Typography variant="subtitle1" style={{alignSelf: "center", marginTop: "5%"}}>You have clicked the button x times</Typography>
        </div>
    )
}

export default Main;