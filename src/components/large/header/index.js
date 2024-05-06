import React from 'react'
import { Avatar, Image, Input, Popover } from 'antd'
import Icon from '@ant-design/icons';
import Link from 'next/link';
import { SearchIcon } from '../../../assets/icons';
import { useSearchContext } from '@/context/search-context';
import { useResultsContext } from '@/context/results-context';
import { useRouter } from 'next/router';
import { useSearch } from '@/hooks/use-search';
import { useFilters } from '@/hooks/use-filters';
import { getAccessToken, removeAuthCookies } from '@/utils/cookies';



export const Header = (props) => {
    let { hideSearch } = props
    const router = useRouter()
    const isLogged = !!getAccessToken()
    const { searchState, setSearchState } = useSearchContext()
    const { resultsState, setResultsState, setColors, setSelectedItems, userState, setUserState } = useResultsContext()

    const { data = [], refetch, isFetching } = useSearch({ query: searchState.searchValue, offset: searchState.offset, search_as_phrase: resultsState.search_as_phrase }, () => { })
    const { data: filtersData = [], refetch: refetchFilters, isFetching: isFetchingFilters } = useFilters({ query_string: searchState.searchValue }, () => { })


    function onLogout() {
        router.push('/sign-in')
        removeAuthCookies()
    }


    async function getSearchDataAndKeysWithNavigating() {
        setSearchState({ offset: 0, activateSearch: true })
        setSelectedItems({ mecelles: [], bolmes: [], fesils: [] })
        refetch()
        refetchFilters()
        setTimeout(() => setResultsState({ loading: false }), 1000)
        router.push('/results')
    }


    async function getSearchDataAndKeys() {
        setSearchState({ offset: 0, activateSearch: true })
        setSelectedItems({ mecelles: [], bolmes: [], fesils: [] })
        refetch()
        refetchFilters()
        setTimeout(() => setResultsState({ loading: false }), 1000)
    }

    function updateResultState() {
        if (!!data.length) {
            if (searchState.offset > 0) {
                setResultsState({
                    list: resultsState.list.concat(data[0]),
                    filters: filtersData,
                    filtersLoading: false,
                    loading: isFetching,
                })
            } else {
                setResultsState({
                    list: data[0],
                    searchKeys: data[1],
                    filters: filtersData,
                    filtersLoading: false,
                    loading: isFetching,
                })
            }
            setColors([...Object.values(data[2])])
        } else {
            setResultsState({
                list: [],
                searchKeys: [],
                filters: {},
                loading: isFetching,
            })
            setColors([])
        }
        // setResultsState({ loading: isFetching })
    }


    const DropdownContent = () => (
        <div className='profile-dropdown-wrapper'>
            <div className='profile-name'>{userState?.name} {userState?.surname}</div>
            <div className='signout-button' onClick={onLogout}>Sign Out</div>
        </div>
    )


    React.useEffect(() => {
        refetch()
        setResultsState({ loading: false, spinnerLoading: false })
    }, [searchState.offset, resultsState.triggerSearch])


    React.useEffect(() => {
        setResultsState({ loading: true })
        getSearchDataAndKeys()
    }, [resultsState.search_as_phrase])


    React.useEffect(() => {
        console.log('@@')
        setResultsState({
            loading: true,
            list: [],
            searchKeys: [],
            filters: {},
        })
        // if (JSON.stringify(data[1]) !== JSON.stringify(resultsState.searchKeys))
        updateResultState()
    }, [searchState.offset, data[1], filtersData?.length])


    return (
        <div className='header-wrapper'>
            <Image
                src='/assets/SVG/legalens-logo.svg'
                className='logo'
                preview={false}
                onClick={() => router.push('/')}
            />
            {
                !hideSearch &&
                <div className='search-wrapper'>
                    <div className='searcher'>
                        <Input
                            value={searchState.searchValue}
                            onChange={(e) => setSearchState({ searchValue: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && getSearchDataAndKeysWithNavigating()}
                        />
                        <div className='button' onClick={getSearchDataAndKeys}>
                            <Icon component={SearchIcon} className='icon' />
                            <div className='label'>Axtar</div>
                        </div>
                    </div>
                </div>
            }
            {
                isLogged
                    ?
                    <Popover content={DropdownContent} trigger="click" placement='bottomRight'>
                        <div className='profile-wrapper'>
                            <div className='user-profile-info-wrapper'>
                                <div className='user-profile-name'>{userState?.name}</div>
                                <div className='user-profile-role'>{userState?.role}</div>
                            </div>
                            <Avatar size={45} className="profile-avatar" style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} >
                                {userState?.name.substring(0, 1)}
                            </Avatar>

                        </div>
                    </Popover>
                    :
                    <div className='auth-buttons-wrapper'>
                        <Link className='registration-button' href="/sign-up">Qeydiyyat</Link>
                        <Link className='login-button' href="/sign-in">Giriş et</Link>
                    </div>
            }
        </div >
    )
}
