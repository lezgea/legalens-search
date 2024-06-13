import React from 'react'
import Icon from '@ant-design/icons';
import { useRouter } from 'next/router'
import { FacebookIcon, InstagramIcon, LinkedinIcon, ThinSearchIcon } from '../../assets/icons';
import { useSearchContext } from '@/context/search-context';
import { Avatar } from 'antd';
import { useResultsContext } from '@/context/results-context';
import { Image } from 'antd'
import { useSearch } from '@/hooks/use-search';
import { MainHeader } from '@/components/large';
import { v4 as uuidv4 } from 'uuid';
import { useSearchHistoryData, useSearchHistoryMutation } from '@/hooks/use-search-history';
import { useFoldersData } from '@/hooks/use-folders';
import { useFavoritesData } from '@/hooks/use-favorites';
import { Space, Table, Modal } from 'antd';
import moment from 'moment/moment';
import { FolderIcon, HistoryIcon, StarIcon } from '@/assets/icons';



export default function ProfileModule() {
    const { searchState, setSearchState } = useSearchContext()
    const { resultsState, setResultsState, setColors, userState } = useResultsContext()
    const router = useRouter()

    const { data = [], refetch, isFetching } = useSearch({ query: searchState.searchValue, offset: searchState.offset, search_as_phrase: resultsState.search_as_phrase }, () => { })
    const { mutate: postSearchHistory, isSuccess, isLoading: postSearchHistoryLoading } = useSearchHistoryMutation()
    const { data: foldersData, refetch: refetchFolders, isFetching: isFetchingFolders } = useFoldersData()
    const { data: favoritesData, refetch: refetchFavorites, isFetching: favoritesIsFetching } = useFavoritesData()
    const { data: historyData, refetch: refetchHistory, isFetching: historyIsFetching } = useSearchHistoryData()


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


    function updateResultsState() {
        setResultsState({ loading: isFetching })
        if (!!data?.length) {
            setResultsState({ list: data[0], searchKeys: data[1] })
            setColors([...Object.values(data[2])])
        } else {
            setResultsState({ list: [], searchKeys: [] })
            setColors([])
        }
    }

    async function getSearchDataAndKeys() {
        postSearchHistory({
            search: searchState.searchValue,
            uniqueId: deviceID,
            source: legalSourceID,
            campaignId: legalCompanyID,
        })
        refetch()
        router.push('/results')
    }

    console.log('$$$$$$', userState)


    React.useEffect(() => {
        updateResultsState()
    }, [searchState.searchValue])


    async function getSearchDataAndKeys(value) {
        if (!!value) {
            setSearchState({ searchValue: value })
            // postSearchHistory({
            //     search: value,
            //     uniqueId: deviceID,
            //     source: legalSourceID,
            //     campaignId: legalCompanyID,
            // })
        } else {
            // postSearchHistory({
            //     search: searchState.searchValue,
            //     uniqueId: deviceID,
            //     source: legalSourceID,
            //     campaignId: legalCompanyID,
            // })
        }
        router.push('/results')
    }


    const FOLDER_COLUMNS = [
        {
            dataIndex: 'createdAt',
            width: '130px',
            render: (value) => {
                return (
                    <div
                        className='history-date'
                        onClick={(event) => {
                            event.stopPropagation()
                            // getSearchDataAndKeys(value)
                        }}
                    >
                        <b>{moment(value).format('LL')}</b>
                        {/* | {moment(value).format('hh:mm a')} */}
                    </div>
                );
            }
        },
        {
            dataIndex: 'name',
            render: (value) => {
                return (
                    <div
                        className='table-link'
                        onClick={(event) => {
                            event.stopPropagation()
                            getSearchDataAndKeys(value)
                        }}
                    >
                        {value}
                    </div>
                );
            }
        },
    ];


    const HISTORY_COLUMNS = [
        {
            dataIndex: 'createdAt',
            width: '130px',
            render: (value) => {
                return (
                    <div
                        className='history-date'
                        onClick={(event) => {
                            event.stopPropagation()
                            getSearchDataAndKeys(value)
                        }}
                    >
                        <b>{moment(value).format('LL')}</b>
                        {/* | {moment(value).format('hh:mm a')} */}
                    </div>
                );
            }
        },
        {
            dataIndex: 'search',
            render: (value) => {
                return (
                    <div
                        className='table-link'
                        onClick={(event) => {
                            event.stopPropagation()
                            getSearchDataAndKeys(value)
                        }}
                    >
                        {value}
                    </div>
                );
            }
        },
    ];


    const FAVORITE_COLUMNS = [
        {
            dataIndex: 'createdAt',
            width: '130px',
            render: (value) => {
                return (
                    <div
                        // style={{ width: 100 }}
                        className='history-date'
                        onClick={(event) => {
                            event.stopPropagation()
                            // getSearchDataAndKeys(value)
                        }}
                    >
                        <b>{moment(value).format('LL')}</b>
                        {/* | {moment(value).format('hh:mm a')} */}
                    </div>
                );
            }
        },
        {
            dataIndex: 'article',
            render: (value) => {
                return (
                    <div
                        className='table-link'
                        onClick={(event) => {
                            event.stopPropagation()
                            // getSearchDataAndKeys(value)
                        }}
                    >
                        {value.name}
                    </div>
                );
            }
        },
    ]


    return (
        <div className='profile-page-wrapper'>
            <MainHeader />
            <div className='profile-wrapper'>

                <div className='profile-content-wrapper'>
                    <div className='background-wrapper'>
                    </div>
                    <div className='profile-image-wrapper'>
                        <Avatar size={190} className="profile-avatar" style={{ backgroundColor: '#d1c5e5', fontSize: 100, color: '#fff' }} >
                            {userState.name.substring(0, 1)}
                        </Avatar>
                    </div>
                    <div className='user-name'>
                        {userState.name} {userState.surname}
                    </div>
                    <div className='user-email'>
                        {userState.email}
                    </div>
                    <div className='user-role'>
                        {userState.role}
                    </div>

                    <div className='profile-password-wrapper'>
                        <div
                            className='action-button-gray'
                            style={{ marginLeft: 'auto', marginRight: 50, width: 200, marginTop: -30, borderRadius: 7 }}
                            onClick={() => router.push('/reset-password')}
                        >
                            <div className='label' style={{ fontSize: 15 }}>Şifrəni yenilə</div>
                        </div>
                    </div>

                    <div className='profile-boxes-wrapper'>
                        <div className='card-box-wrapper'>
                            <div className='card-box-header'>
                                <Icon component={FolderIcon} className='icon' style={{ fontSize: 20, marginRight: 10 }} />
                                FOLDERS
                            </div>
                            <Table
                                showHeader={false}
                                locale={{ emptyText: 'Təəsüfki, heç bir məlumat tapılmadı' }}
                                columns={FOLDER_COLUMNS}
                                dataSource={foldersData.data}
                                pagination={false}
                            />
                        </div>
                        <div className='card-box-wrapper'>
                            <div className='card-box-header'>
                                <Icon component={HistoryIcon} className='icon' style={{ fontSize: 20, marginRight: 10 }} />
                                HISTORY
                            </div>
                            <Table
                                showHeader={false}
                                locale={{ emptyText: 'Təəsüfki, heç bir məlumat tapılmadı' }}
                                columns={HISTORY_COLUMNS}
                                dataSource={historyData.data}
                            />
                        </div>
                        <div className='card-box-wrapper'>
                            <div className='card-box-header'>
                                <Icon component={StarIcon} className='icon' style={{ fontSize: 20, marginRight: 10 }} />
                                FAVORITES
                            </div>
                            <Table
                                showHeader={false}
                                locale={{ emptyText: 'Təəsüfki, heç bir məlumat tapılmadı' }}
                                columns={FAVORITE_COLUMNS}
                                dataSource={favoritesData.data}
                            />
                        </div>
                    </div>
                </div>


                <div className='footer-bottom'>
                    <div className='footer-icons-wrapper'>
                        {/* <a href='https://www.linkedin.com/company/legalens/' target='_blank'> */}
                        {/* <Icon component={TiktokIcon} className='footer-icon' /> */}
                        {/* </a> */}
                        <a href='https://www.linkedin.com/company/legalens/' target='_blank'>
                            <Icon component={LinkedinIcon} className='footer-icon' />
                        </a>
                        <a href='https://www.facebook.com/profile.php?id=61555927896263&is_tour_dismissed=true' target='_blank'>
                            <Icon component={FacebookIcon} className='footer-icon' />
                        </a>
                        <a href='https://www.instagram.com/legalens.ai/' target='_blank'>
                            <Icon component={InstagramIcon} className='footer-icon' />
                        </a>
                        {/* <a href='https://www.facebook.com/profile.php?id=61555927896263&is_tour_dismissed=true' target='_blank'> */}
                        {/* <Icon component={YoutubeIcon} className='footer-icon' /> */}
                        {/* </a> */}
                    </div>
                    <div className='footer-ai-wrapper'>
                        <div className='footer-ai-text'>Product of</div>
                        <Image
                            src='/assets/SVG/ai-logo.svg'
                            className='footer-ai-logo'
                            preview={false}
                            onClick={() => router.push('/')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}