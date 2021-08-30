import React from 'react';
import { Button, CircularProgress, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';
import { GlobalStateContext } from '../contexts/GlobalStateProvider';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    progressBar: {
        alignSelf: "center",
        margin: "auto"
    },
    welcomeText: {
        alignSelf: "center",
        marginBottom: "7%",
        textShadow: "0 0 7px #fff,0 0 10px #fff,0 0 21px #fff,0 0 42px #0092FF, 0 0 82px #0092FF, 0 0 92px #0092FF, 0 0 102px #0092FF, 0 0 151px #0092FF",
        color: "slategray",
        letterSpacing: "4px",
        
    },
    incrementButton: {
        height: "8em",
        width: "8em",
        alignSelf: "center",
        borderRadius: "4em",
        background: "linear-gradient(120deg, white, gray)", 
        boxShadow: "0px 2px 3px 6px #94ffff"
    }
}));

function Main() {

    const classes = useStyles();
    
    const {globalState, setGlobalState} = React.useContext(GlobalStateContext);
    const [signedIn, setSignedIn] = React.useState(true);
    
    React.useEffect(async () => {
        (async function(){        
            try {
                let response = await axios.get('/api/user/main', {withCredentials: "true"});
                setGlobalState(state => ({
                    ...state,
                    username: response.data.username,
                    counter: response.data.counter,
                    loading: false
                }));
            } catch (err) {
                console.log(`An error occurred when making a request: ${err}`);
            }
        })();
        
    }, [])

    const handleButtonClick = async (event) => {
        try {
            const response = await axios.post('/api/user/main/increment', {}, {withCredentials: "true"});
            setGlobalState(state => ({
                ...state,
                counter: state.counter + 1
            }));
        } catch (err) {
            console.log(`An error occurred: ${JSON.stringify(err)}`);
        }
    }

    const handleLogOut = async (event) => {
        try {
            const response = await axios.get('/api/user/main/signout', {withCredentials: "true"});
            setSignedIn(false);
        } catch (err) {
            console.log(`An error occurred while signing out: ${JSON.stringify(err)}`);
        }
    }
    
    return (
        globalState.loading ? <CircularProgress className={classes.progressBar}/> : (
            signedIn ? (
                <div style={{width: "inherit", height: "inherit", display: "flex", flexDirection: "column"}}>
                    <Toolbar style={{background: "linear-gradient(45deg, #F9DF74, slategray)"}}>
                        <Typography style={{"flexGrow": 1, color: "white", fontWeight:"lighter", textShadow: "2px 1px 10px slategray"}}>UserAuthDemo</Typography>
                        <Button onClick={handleLogOut} variant="outlined" style={{color: "white", textShadow: "2px 0px 4px #F9DF74"}}>Log out</Button>
                    </Toolbar>
                    <div style={{display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center"}}>
                        <Typography variant="h3" className={classes.welcomeText}>Hi {globalState.username}</Typography>
                        <Button onClick={handleButtonClick} className={classes.incrementButton} variant="contained"><Typography variant="overline" style={{color: "white"}}></Typography></Button>
                        <Typography variant="subtitle1" className={classes.welcomeText} style={{alignSelf: "center", marginTop: "5%"}}>You have clicked the button <h4 style={{display:"inline", color: "#007070"}}>{globalState.counter}</h4> times</Typography>
                    </div>
                </div>
            ) : <Redirect from="/main" to="/signin"/>
        )
    );
}

export default Main;