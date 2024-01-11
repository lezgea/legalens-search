/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { RESULTS_STATE_INITIAL } from '@/constants/initial-states';



const ResultsContext = React.createContext(null)

export function ResultsContextProvider({ children }) {
    const [resultsState, setResultsState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        RESULTS_STATE_INITIAL
    )

    const value = { resultsState, setResultsState }


    return (
        <ResultsContext.Provider value={value}>
            {children}
        </ResultsContext.Provider>
    )
}


/**
 *  @returns {{ 
 *      resultsState: Array, 
 *      setResultsState: (result: Object) => VoidFunction 
 * }}
 */
export function useResultsContext() {
    const context = React.useContext(ResultsContext)

    if (context === undefined) {
        throw new Error(
            'useResultsContext must be used within a ResultsContextProvider'
        )
    }
    return context
}
