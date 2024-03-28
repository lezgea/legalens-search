/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { SEARCH_STATE_INITIAL } from '@/constants/initial-states';



const SearchContext = React.createContext(null);

export function SearchContextProvider({ children }) {
    const [searchState, setSearchState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        SEARCH_STATE_INITIAL
    )

    const value = {
        searchState,
        setSearchState,
    }


    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}


/**
 *  @returns {{ 
 *      searchState: Object, 
 *      setSearchState: (search: Object) => VoidFunction 
 * }}
 */
export function useSearchContext() {
    const context = React.useContext(SearchContext);

    if (context === undefined) {
        throw new Error(
            'useSearchContext must be used within a SarchContextProvider'
        )
    }
    return context;
}
