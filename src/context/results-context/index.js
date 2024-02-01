/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { RESULTS_STATE_INITIAL } from '@/constants/initial-states';



const ResultsContext = React.createContext(null)

export function ResultsContextProvider({ children }) {
    const [resultsState, setResultsState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        RESULTS_STATE_INITIAL
    )
    const [colors, setColors] = React.useState([])
    const [selectedResult, setSelectedResult] = React.useState({})


    function getRandomRGB() {
        let o = Math.round, r = Math.random, s = 230;
        return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')'
    }


    function getColorsArray() {
        let arr = [...Array(100)].map(() => getRandomRGB())
        setColors(arr)
    }


    const value = { resultsState, setResultsState, colors, setColors, selectedResult, setSelectedResult }


    React.useEffect(() => {
        getColorsArray()
    }, [])


    return (
        <ResultsContext.Provider value={value}>
            {children}
        </ResultsContext.Provider>
    )
}


/**
 *  @returns {{ 
 *      resultsState: Array, 
 *      colors: Array,
 *      setResultsState: (result: Object) => VoidFunction 
 *      setColors: (result: Object) => VoidFunction 
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
