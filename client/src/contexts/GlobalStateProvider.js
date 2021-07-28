import React from 'react';

export const GlobalStateContext = React.createContext();

const GlobalStateContextProvider = (props) => {

    const [globalState, setGlobalState] = React.useState();
    return (
        <GlobalStateContext.Provider value={{globalState, setGlobalState}}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalStateContextProvider;