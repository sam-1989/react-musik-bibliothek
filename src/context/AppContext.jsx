import React, { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
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
        case "SET_TOTAL_RESULTS":
            return { ...state, totalResults: action.payload };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.payload };
        case "RESET_SEARCH":
            return { ...initialState };
        default:
            return state;
    }
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
