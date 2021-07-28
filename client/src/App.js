import { Paper, TextField, Button, Typography } from '@material-ui/core';
import { Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

function App() {

  return (
    <div style={{width: "800px", height: "600px", marginTop: "160px"}}>
        <Paper elevation={4} style={{width: "inherit", height: "inherit", background: "linear-gradient(-20deg, #F9DF74, #E0D0C1)", display: "flex", flexDirection: "column"}}>
        <div style={{borderRadius: "4px", border: "2px solid", alignSelf: "center", height: "75%", width: "50%", marginTop: "10%"}}>
          
          <Switch>
            <Route path="/signin">
              <SignIn/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/">
                <SignIn/>
            </Route>
          </Switch>

        </div>
        </Paper>
    </div>

  );
}


function SignIn() {

  const usernameInput = React.useRef(null);
  const passwordInput = React.useRef(null);
  
  const handleSignIn = async () => {
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    
    let response = await axios.post('http://localhost:3222/api/user/signin', {
      username: username,
      password: password
    });

    console.log(`Response: ${JSON.stringify(response)}`);
  }

  return (
    <form style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <TextField
              label="Username"
              maxRows={1}
              variant="outlined"
              inputRef={usernameInput}
              style={{alignSelf: "center", width: "70%", marginTop: "20%", boxShadow: "1px 1px 2px"}}
            />
            <br/>
            <TextField
              label="Password"
              maxRows={1}
              type="password"
              variant="outlined"
              inputRef={passwordInput}
              style={{alignSelf: "center", width: "70%", marginTop: "5%", boxShadow: "1px 1px 2px"}}
              />
            <Button
              style={{marginTop: "10%", width: "80%", background: "linear-gradient(45deg, #EDAE49, #F9DF74)", boxShadow: "2px 2px 4px"}}
              variant="contained"
              onClick={handleSignIn}>
                Sign In
            </Button>
            <Typography style={{fontSize:"0.9em", marginTop: "2%"}} variant="caption">Don't have an account? 
            Click <Link to="/register">here</Link> to register</Typography>
          </form>
  )
}

function Register() {
  
  const usernameInput = React.useRef(null);
  const emailInput = React.useRef(null);
  const passwordInput = React.useRef(null);
  const confirmPasswordInput = React.useRef(null);
  
  const [registerState, setRegisterState] = React.useState({
    doPasswordsMatch: true
  });

  const handleRegistration = async () => {
    const username = usernameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    console.log(`Username input: ${(usernameInput.current.value)}`);
    console.log(`Email input: ${(emailInput.current.value)}`);
    console.log(`Password input: ${(passwordInput.current.value)}`);
    console.log(`Confirm Password input: ${(confirmPasswordInput.current.value)}`);

    if (password !== confirmPasswordInput.current.value) {
      setRegisterState({
        doPasswordsMatch: false,
        isAllFieldsPopulated: false
      });
    }

    if(registerState.doPasswordsMatch) {
      //make a post request to the server.

      axios.interceptors.request.use(req => {
        req.headers['Access-Control-Allow-Origin'] = '*';
        return req;
      })

      let response = await axios.post("http://localhost:3222/api/user/register", {
        username: username,
        email: email,
        password: password
      });
      
      console.log(`Response: ${JSON.stringify(response)}`);
      usernameInput.current.value = "";
      emailInput.current.value = "";
      passwordInput.current.value = "";
      confirmPasswordInput.current.value = "";
    } 
  }
  
  return (
    <form style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <TextField
          label="Username"
          maxRows={1}
          variant="outlined"
          type="string"
          inputRef={usernameInput}
          style={{marginTop: "10%", boxShadow: "1px 1px 2px", width: "70%"}}/>
        <TextField
          label="Email"
          variant="outlined"
          maxRows={1}
          inputRef={emailInput}
          style={{marginTop: "5%", boxShadow: "1px 1px 2px", width: "70%"}}/>
        <TextField
          label="Password"
          maxRows={1}
          variant="outlined"
          type="password"
          inputRef={passwordInput}
          style={{marginTop: "5%", boxShadow: "1px 1px 2px", width: "70%"}}/>
        <TextField
          label="Confirm password"
          maxRows={1}
          variant="outlined"
          type="password"
          inputRef={confirmPasswordInput}
          style={{marginTop: "5%", boxShadow: "1px 1px 2px", width: "70%"}}/>
        <Button 
            onClick={handleRegistration}
            variant="contained"
            style={{width: "80%", marginTop: "5%", background: "linear-gradient(45deg, #EDAE49, #F9DF74)", boxShadow: "2px 1px 1px"}}>Submit</Button>
        <Typography variant="caption" style={{fontSize:"0.9em", marginTop: "2%"}}>
          Already have an account? Click <Link to="/signin">here</Link> to sign in.
        </Typography>
    </form>
  )
}

export default App;
