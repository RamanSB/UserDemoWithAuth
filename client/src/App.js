import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import Register from './components/Register.js';
import SignIn from './components/SignIn.js';
import Main from './components/Main.js';
import React from 'react';

const useStyles = makeStyles(theme => ({
    paperContainer: {
      width: "inherit",
      height: "inherit",
      background: "linear-gradient(-20deg, #F9DF74, #E0D0C1)",
      display: "flex",
      flexDirection: "column"
    },
    subContainerDiv: {
      borderRadius: "4px",
      border: "2px solid",
      alignSelf: "center",
      height: "75%",
      width: "50%", 
      marginTop: "10%"
    }
  })
);

function App() {

  const classes = useStyles();
  return (
    <div style={{width: "800px", height: "600px", marginTop: "160px"}}>
        <Paper elevation={4} className={classes.paperContainer}>
          <Switch>
            <Route path="/main">
              <Main/>
            </Route>
            <Route path="/signin">
              <div className={classes.subContainerDiv}>
                <SignIn/>
              </div>
            </Route>
            <Route path="/register">
              <div className={classes.subContainerDiv}>
                <Register/>
              </div>
            </Route>
            <Route path="/">
              <div className={classes.subContainerDiv}>
                <SignIn/>
              </div>
            </Route>
          </Switch>
        </Paper>
    </div>
  );
}

export default App;
