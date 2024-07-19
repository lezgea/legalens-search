import React from 'react'
import { Avatar, Image, Input, Popover } from 'antd'
import Icon from '@ant-design/icons';
import Link from 'next/link';
import { SearchIcon } from '../../../assets/icons';
import { useSearchContext } from '@/context/search-context';
import { useResultsContext } from '@/context/results-context';
import { useRouter } from 'next/router';
import { useSearch, useSearchDocuments, useSearchMecelles } from '@/hooks/use-search';
import { useFilters } from '@/hooks/use-filters';
import { getAccessToken, removeAuthCookies } from '@/utils/cookies';
import { useSearchHistoryMutation } from '@/hooks/use-search-history';
import { getUserProfileInfo } from '@/api/auth';
import { ActionButton } from '@/components/small';



export const DocsHeader = (props) => {
    let { hideSearch } = props
    const router = useRouter()
    const isLogged = !!getAccessToken()
    const { searchState, setSearchState } = useSearchContext()
    const { resultsState, setResultsState, setColors, setSelectedItems, userState, setUserState } = useResultsContext()

    const { data = [], refetch, isFetching } = useSearch({ query: searchState.searchValue, offset: searchState.offset, search_as_phrase: resultsState.search_as_phrase }, () => { })
    const { data: filtersData = [], refetch: refetchFilters, isFetching: isFetchingFilters } = useFilters({ query_string: searchState.searchValue }, () => { })
    const { mutate: postSearchHistory, isSuccess, isLoading: postSearchHistoryLoading } = useSearchHistoryMutation()
    const { data: dataMecelles = [], refetch: refetchMecelles, isFetching: isFetchingMecelles } = useSearchMecelles({ query: searchState.searchValue, offset: searchState.offset, search_as_phrase: resultsState.search_as_phrase }, () => { })
    const { data: dataDocuments = [], refetch: refetchDocuments, isFetching: isFetchingDocuments } = useSearchDocuments({ query: searchState.searchValue, offset: searchState.offset, search_as_phrase: resultsState.search_as_phrase }, () => { })


    async function getUserInfo() {
        let response = await getUserProfileInfo()
        if (response.data?.key === "success") {
            setUserState({ ...response.data?.data })
        }
    }

    const getDeviceID = () => {
        let deviceID = localStorage.getItem('deviceID')
        if (!deviceID) {
            deviceID = uuidv4()
            localStorage.setItem('deviceID', deviceID)
        }
        return deviceID
    }


    const getSourceID = () => {
        let legalSourceID = localStorage.getItem('legalSourceID')
        if (!legalSourceID) {
            legalSourceID = router?.query?.s
            localStorage.setItem('legalSourceID', legalSourceID)
        }
        return legalSourceID
    }


    const getCompanyID = () => {
        let legalCompanyID = localStorage.getItem('legalCompanyID')
        if (!legalCompanyID) {
            legalCompanyID = router?.query?.c
            localStorage.setItem('legalCompanyID', legalCompanyID)
        }
        return legalCompanyID
    }


    const deviceID = getDeviceID()
    const legalSourceID = getSourceID()
    const legalCompanyID = getCompanyID()


    function onLogout() {
        router.push('/sign-in')
        removeAuthCookies()
    }


    async function getSearchDataAndKeysWithNavigating() {
        setSearchState({ offset: 0, activateSearch: true })
        setSelectedItems({ mecelles: [], bolmes: [], fesils: [] })
        postSearchHistory({
            search: searchState.searchValue,
            uniqueId: deviceID,
            source: legalSourceID,
            campaignId: legalCompanyID,
        })
        refetch()
        refetchFilters()
        setTimeout(() => setResultsState({ loading: false }), 1000)
        router.push('/results')
    }


    async function getSearchDataAndKeysWithNavigatingMec() {
        setSearchState({ offset: 0, activateSearch: true })
        setSelectedItems({ mecelles: [], bolmes: [], fesils: [] })
        postSearchHistory({
            search: searchState.searchValue,
            uniqueId: deviceID,
            source: legalSourceID,
            campaignId: legalCompanyID,
        })
        refetchMecelles()
        refetchFilters()
        setTimeout(() => setResultsState({ loading: false }), 1000)
        router.push('/results')
    }


    async function getSearchDataAndKeysWithNavigatingDocs() {
        setSearchState({ offset: 0, activateSearch: true })
        setSelectedItems({ mecelles: [], bolmes: [], fesils: [] })
        postSearchHistory({
            search: searchState.searchValue,
            uniqueId: deviceID,
            source: legalSourceID,
            campaignId: legalCompanyID,
        })
        refetchDocuments()
        refetchFilters()
        setTimeout(() => setResultsState({ loading: false }), 1000)
        router.push('/documents')
    }


    async function getSearchDataAndKeys() {
        setSearchState({ offset: 0, activateSearch: true })
        setSelectedItems({ mecelles: [], bolmes: [], fesils: [] })
        refetch()
        refetchFilters()
        setTimeout(() => setResultsState({ loading: false }), 1000)
    }


    function updateResultState() {
        if (!!dataDocuments?.mecelle_dict?.length) {
            if (searchState.offset > 0) {
                setResultsState({
                    list: resultsState.list.concat(dataDocuments.mecelle_dict),
                    filters: filtersData,
                    filtersLoading: false,
                    loading: false,
                })
            } else {
                setResultsState({
                    list: dataDocuments.mecelle_dict,
                    searchKeys: dataDocuments.search_keywords,
                    filters: filtersData,
                    filtersLoading: false,
                    loading: false,
                })
            }
            setColors([...Object.values(dataDocuments.all_colors)])
        } else {
            setResultsState({
                list: [],
                searchKeys: [],
                filters: {},
                loading: isFetchingDocuments,
            })
            setColors([])
        }
    }


    const DropdownContent = () => (
        <div className='profile-dropdown-wrapper'>
            <div className='profile-name'>{userState?.name} {userState?.surname}</div>
            <div className='action-button-gray' style={{ width: '100%', marginTop: 10, borderRadius: 7 }} onClick={() => router.push('/profile')}>
                <div className='label' style={{ fontSize: 15 }}>Profil</div>
            </div>
            <div className='action-button-gray' style={{ width: '100%', marginTop: 7, borderRadius: 7 }} onClick={() => router.push('/history')}>
                <div className='label' style={{ fontSize: 15 }}>Tarixçə</div>
            </div>
            <div className='action-button-gray' style={{ width: '100%', marginTop: 7, borderRadius: 7 }} onClick={() => router.push('/favorites')}>
                <div className='label' style={{ fontSize: 15 }}>Seçilmişlər</div>
            </div>
            <div className='signout-button' onClick={onLogout}>Çıxış et</div>
        </div>
    )


    React.useEffect(() => {
        if (isLogged) getUserInfo()
    }, [isLogged])


    React.useEffect(() => {
        refetch()
        setResultsState({ loading: false, spinnerLoading: false })
    }, [searchState.offset, resultsState.triggerSearch])


    React.useEffect(() => {
        setResultsState({ loading: true })
        getSearchDataAndKeys()
    }, [resultsState.search_as_phrase])


    React.useEffect(() => {
        if (searchState.offset == 0)
            setResultsState({
                loading: true,
                list: [],
                searchKeys: [],
            })
        updateResultState()
    }, [data[1], filtersData?.length])


    React.useEffect(() => {
        updateResultState()
    }, [dataMecelles[0], dataDocuments.mecelle_dict])


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
                        // onKeyDown={(e) => e.key === 'Enter' && getSearchDataAndKeysWithNavigating()}
                        />
                        {/* <div className='button' onClick={getSearchDataAndKeys}>
                            <Icon component={SearchIcon} className='icon' />
                            <div className='label'>Axtar</div>
                        </div> */}

                        <div style={{ display: 'flex', height: 60, alignItems: 'center', justifyContent: 'center', marginRight: 30, }}>
                            <ActionButton
                                color='white'
                                label='Mecellede Axtar'
                                style={{ height: 35, paddingLeft: 15, paddingRight: 15 }}
                                labelStyle={{ fontSize: 13 }}
                                onClick={getSearchDataAndKeysWithNavigatingMec}
                            />
                            <ActionButton
                                color='white'
                                label='Senedlerde Axtar'
                                style={{ height: 35, marginLeft: 10, marginRight: 10, paddingLeft: 15, paddingRight: 15 }}
                                labelStyle={{ fontSize: 13 }}
                                onClick={getSearchDataAndKeysWithNavigatingDocs}
                            />
                        </div>
                    </div>
                </div>
            }
            {
                isLogged
                    ?
                    <div className='profile-wrapper'>
                        <div className='user-profile-info-wrapper'>
                            <div className='user-profile-name'>{userState?.name}</div>
                        </div>
                        <Popover content={DropdownContent} trigger="click" placement='bottomRight'>
                            <Avatar size={40} className="profile-avatar" style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} >
                                {userState?.name.substring(0, 1)}
                            </Avatar>
                        </Popover>
                    </div>
                    :
                    <div className='auth-buttons-wrapper'>
                        <Link className='registration-button' href="/sign-up">Qeydiyyat</Link>
                        <Link className='login-button' href="/sign-in">Giriş et</Link>
                    </div>
            }
        </div >
    )
}
