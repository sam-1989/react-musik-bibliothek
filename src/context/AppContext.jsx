import React, { createContext, useReducer } from "react";

export const AppContext = createContext();

const initalState = {
    searchQuery: "",
    results: [],
    totalResults: 0,
    currentPage: 0, 
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_SEARCH_QUERY":
            return { ...state, searchQuery: action.payload };
        case "SET_RESULTS":
            return { ...state, results: action.payload };
        default:
            return state;
    }
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
