import React from 'react';

export const GlobalStateContext = React.createContext();

const GlobalStateContextProvider = (props) => {

    const [globalState, setGlobalState] = React.useState({
        username: "",
        counter: 0,
        loading: true
    });
    return (
        <GlobalStateContext.Provider value={{globalState, setGlobalState}}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalStateContextProvider;