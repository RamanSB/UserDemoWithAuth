import { TextField, Typography, Button } from '@material-ui/core';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    signInTextField: {
        alignSelf: "center",
        width: "70%",
        boxShadow: "1px 1px 2px"
    },
    signInButton: {
        marginTop: "10%",
        width: "80%",
        background: "linear-gradient(45deg, #EDAE49, #F9DF74)",
        boxShadow: "2px 2px 4px"
    },
    signUpText: {
        fontSize:"0.9em",
        marginTop: "2%"
    }
}));


function SignIn() {
    
    const classes = useStyles();

    const usernameInput = React.useRef(null);
    const passwordInput = React.useRef(null);

    const [signedIn, setSignedIn] = React.useState(false);

    const handleSignIn = async () => {
      const username = usernameInput.current.value;
      const password = passwordInput.current.value;
      
      let response = await axios.post('http://localhost:3222/api/user/signin', {
          username: username,
          password: password,
        }, {withCredentials: "true"}
      );
      
      console.log(`[SignIn Component] ${JSON.stringify(response)}`);

      if (response.status === 200) {
        setSignedIn(true);
      }
    }

    return ( signedIn ? <Redirect to="/main"/> : 
      <form style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <TextField
                label="Username"
                maxRows={1}
                variant="outlined"
                inputRef={usernameInput}
                className={classes.signInTextField}
                style={{marginTop: "20%"}}
              />
              <br/>
              <TextField
                label="Password"
                maxRows={1}
                type="password"
                variant="outlined"
                inputRef={passwordInput}
                className={classes.signInTextField}
                style={{marginTop: "5%"}}
                />
              <Button
                className={classes.signInButton}
                variant="contained"
                onClick={handleSignIn}>
                  Sign In
              </Button>
              <Typography className={classes.signUpText} variant="caption">Don't have an account? 
              Click <Link to="/register">here</Link> to register</Typography>
        </form>
    
    )
  }

  export default SignIn;