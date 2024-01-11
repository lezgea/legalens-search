/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { SEARCH_KEYS_INITIAL, SEARCH_STATE_INITIAL } from '@/constants/initial-states';



const SearchContext = React.createContext(null);

export function SearchContextProvider({ children }) {
    const [searchState, setSearchState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        SEARCH_STATE_INITIAL
    )
    const [searchKeys, setSearchKeys] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        SEARCH_KEYS_INITIAL
    )


    const value = { searchState, setSearchState, searchKeys, setSearchKeys }


    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}


/**
 *  @returns {{ 
 *      searchState: Object, 
 *      searchKeys: Array, 
 *      setSearchState: (search: Object) => VoidFunction 
 *      setSearchKeys: (keys: Object) => VoidFunction 
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
