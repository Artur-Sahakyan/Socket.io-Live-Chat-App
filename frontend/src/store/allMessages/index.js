import React, { createContext, useState } from 'react';

const AllMessagesContext = createContext(null);

const initialState = {
    allMessages: [],
};

const AllMessagesProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    return (
        <AllMessagesContext.Provider value={{
            allMessages: state.allMessages,
            setAllMessages: (newMessages) => setState({ allMessages: newMessages })
        }}>
            {children}
        </AllMessagesContext.Provider> 
    );
};

export { AllMessagesProvider, AllMessagesContext };