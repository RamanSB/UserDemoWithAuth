import React from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import { GlobalStateContext } from '../contexts/GlobalStateProvider';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    progressBar: {
        alignSelf: "center",
        margin: "auto"
    },
    welcomeText: {
        alignSelf: "center",
        marginBottom: "5%",
        textShadow: "0 0 7px #fff,0 0 10px #fff,0 0 21px #fff,0 0 42px #0092FF, 0 0 82px #0092FF, 0 0 92px #0092FF, 0 0 102px #0092FF, 0 0 151px #0092FF",
        color: "slategray"
    }
}));

function Main() {

    const classes = useStyles();
    
    const {globalState, setGlobalState} = React.useContext(GlobalStateContext);
    // const [loading, setLoading] = React.useState(true);
    
    React.useEffect(async () => {
        (async function(){        
            try {
                let response = await axios.get('http://localhost:3222/api/user/main', {withCredentials: "true"});
                console.log(`Server response from front-end: ${JSON.stringify(response)}`);
                setGlobalState(state => ({
                    ...state,
                    username: response.data.username,
                    counter: response.data.counter,
                    loading: false
                }));
            } catch (err) {
                console.log(`An error occurred when making a request: ${err}`)
            }
        })();
        
    }, [])

    const handleButtonClick = async (event) => {
        console.log(`onButtonClick Event Handler`);
        try {
            const response = await axios.post('http://localhost:3222/api/user/main/increment', {}, {withCredentials: "true"});
            console.log(`Response: ${JSON.stringify(response)}`);
            setGlobalState(state => ({
                ...state,
                counter: state.counter + 1
            }));
        } catch (err) {
            console.log(`An error occurred: ${JSON.stringify(err)}`);
        }
    }
    
    return (
        globalState.loading ? <CircularProgress className={classes.progressBar}/> : (
            (
                <div style={{width: "inherit", height: "inherit", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Typography variant="h3" className={classes.welcomeText}>Hi {globalState.username}</Typography>
                    <Button onClick={handleButtonClick} variant="contained" style={{height: "8em", width: "8em", alignSelf: "center", borderRadius: "4em", backgroundColor: "white", boxShadow: "0px 2px 8px 10px #94ffff"}}><Typography variant="overline" style={{color: "white"}}></Typography></Button>
                    <Typography variant="subtitle1" className={classes.welcomeText} style={{alignSelf: "center", marginTop: "5%"}}>You have clicked the button <h4 style={{display:"inline", color: "#007070"}}>{globalState.counter}</h4> times</Typography>
                </div>
            )
        )
    );
}

export default Main;