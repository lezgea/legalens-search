import React from 'react'
import { Avatar, Image, Input, Popover } from 'antd'
import Icon from '@ant-design/icons';
import { ForumIcon, HammerIcon, NotificationIcon, SearchIcon, SpellCheckIcon } from '../../../assets/icons';
import { useSearchContext } from '@/context/search-context';
import { useResultsContext } from '@/context/results-context';
import { useRouter } from 'next/router';
import { useSearch } from '@/hooks/use-search';
import Link from 'next/link';
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
        // setTriggerUpdate(true)
        setTimeout(() => setResultsState({ loading: false }), 1000)

        router.push('/results')
    }


    async function getSearchDataAndKeys() {
        setSearchState({ offset: 0, activateSearch: true })
        setSelectedItems({ mecelles: [], bolmes: [], fesils: [] })
        refetch()
        refetchFilters()
        // setTriggerUpdate(true)
        setTimeout(() => setResultsState({ loading: false }), 1000)

        // router.push('/results')
    }

    function updateResultState() {
        if (!!data.length && router.pathname === '/results') {
            console.log('******', router)
            if (searchState.offset > 0) {
                setResultsState({
                    list: resultsState.list.concat(data[0]),
                    filters: filtersData,
                    filtersLoading: false,
                })
            } else {
                setResultsState({
                    list: data[0],
                    searchKeys: data[1],
                    filters: filtersData,
                    filtersLoading: false,
                })
            }
            setColors([...Object.values(data[2])])
        } else {
            setResultsState({
                list: [],
                searchKeys: [],
                filters: {}
            })
            setColors([])
        }
        setResultsState({ loading: false })
    }

    // async function getUserInfo() {
    //     let response = await getUserProfileInfo()
    //     if (response.data?.key === "success") {
    //         setUserState({ ...response.data?.data })
    //     }
    // }


    const DropdownContent = () => (
        <div className='profile-dropdown-wrapper'>
            <div className='profile-name'>{userState?.name} {userState?.surname}</div>
            <div className='signout-button' onClick={onLogout}>Sign Out</div>
        </div>
    )


    // React.useEffect(() => {
    //     if (isLogged) getUserInfo()
    // }, [isLogged])


    React.useEffect(() => {
        refetch()
        setResultsState({ loading: false, spinnerLoading: false })
    }, [searchState.offset, resultsState.triggerSearch])


    React.useEffect(() => {
        setResultsState({ loading: true })
        getSearchDataAndKeys()
    }, [resultsState.search_as_phrase])


    React.useEffect(() => {
        if (searchState.searchValue) {
            setResultsState({ loading: true })
            updateResultState()
        }
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
                    {
                        // filtersRow.map(item =>
                        //     <FilterButton
                        //         key={item.value}
                        //         selected={searchState.activeFilter}
                        //         setSelected={(v) => setSearchState({ activeFilter: v })}
                        //         {...item}
                        //     />
                        // )
                    }
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
                            {/* <div className='notification-wrapper'>
                            <Icon component={NotificationIcon} className='icon' />
                            <div className='count-circle'>
                                <div className='text'>3</div>
                            </div>
                        </div> */}
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



const FilterButton = (props) => {
    let { label, value, icon, size, selected, setSelected } = props
    let isSelected = selected === value

    return (
        <div className={`filter-button${isSelected ? '-selected' : ''}`} onClick={() => setSelected(value)}>
            <Icon component={icon} className='icon' style={{ fontSize: size }} />
            <div className='label'>{label}</div>
        </div>
    )
}