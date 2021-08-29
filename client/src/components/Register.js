import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function Register() {
  
    const usernameInput = React.useRef(null);
    const emailInput = React.useRef(null);
    const passwordInput = React.useRef(null);
    const confirmPasswordInput = React.useRef(null);
    
    const [registerState, setRegisterState] = React.useState({
      doPasswordsMatch: true,
      isRegistrationSuccessful: false
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
        let response = await axios.post("http://localhost:3222/api/user/register", {
          username: username,
          email: email,
          password: password,
        }, {withCredentials: "true"});
        
        console.log(`Response [x]: ${JSON.stringify(response)}`);
        usernameInput.current.value = "";
        emailInput.current.value = "";
        passwordInput.current.value = "";
        confirmPasswordInput.current.value = "";
        console.log(`Response [x-data]: ${JSON.stringify(response.data)}`);
        
        if(response.status === 201) {
            console.log(`Rendering redirection`);
            setRegisterState(state => ({
                ...state,
                isRegistrationSuccessful: true,
                counter: 0
            }));
        }
      } 
    }
    
    return ( registerState.isRegistrationSuccessful ? <Redirect exact from="/register" to="/signin"/> :
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

  export default Register;