import React from 'react'
import { useRouter } from 'next/router'
import { useSearchContext } from '@/context/search-context';
import { Space, Table, Modal } from 'antd';
import { useResultsContext } from '@/context/results-context';
import { MainHeader } from '@/components/large';
import { v4 as uuidv4 } from 'uuid';
import { getAccessToken } from '@/utils/cookies';
import moment from 'moment/moment';
import Loader from '@/components/large/loader';
import { useFavoritesData, useFavoritesDelete } from '@/hooks/use-favorites';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal;



export default function FavoritesModule() {
    const { searchState, setSearchState } = useSearchContext()
    const { setResultsState, setColors } = useResultsContext()
    const router = useRouter()

    const { data: favoritesData, refetch: refetchFavorites, isFetching: favoritesIsFetching } = useFavoritesData()
    const { mutate: deleteFavorite, isSuccess, isLoading: favoriteDeleteLoading } = useFavoritesDelete()


    function onDeleteFavoriteItem(ID) {
        confirm({
            centered: true,
            title: 'Seçilmişi silmək istədiyinizə əminsinizmi?',
            icon: <ExclamationCircleFilled />,
            okText: 'Bəli',
            okType: 'danger',
            cancelText: 'Xeyr',
            onOk() {
                console.log('OK');
                deleteFavorite({ id: ID })
                refetchFavorites()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    const columns = [
        {
            dataIndex: 'createdAt',
            width: '200px',
            render: (value) => {
                return (
                    <div
                        // style={{ width: 100 }}
                        className='history-date'
                        onClick={(event) => {
                            event.stopPropagation()
                            getSearchDataAndKeys(value)
                        }}
                    >
                        <b>{moment(value).format('LL')}</b> | {moment(value).format('hh:mm a')}
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
                            getSearchDataAndKeys(value)
                        }}
                    >
                        {value.name}
                    </div>
                );
            }
        },
        {
            key: 'action',
            width: '50px',
            render: (_, record) => (
                <Space size="small">
                    <DeleteOutlined className='list-delete-icon' onClick={() => onDeleteFavoriteItem(record.article?.id)} />
                </Space>
            ),
        },
    ];


    const getDeviceID = () => {
        let token = getAccessToken()
        if (!!token) {
            return token;
        }
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
        setResultsState({
            loading: true,
            list: [],
            searchKeys: [],
            filters: {},
        })
    }


    async function getSearchDataAndKeys(value) {
        if (!!value) {
            setSearchState({ searchValue: value })
            postSearchHistory({
                search: value,
                uniqueId: deviceID,
                source: legalSourceID,
                campaignId: legalCompanyID,
            })
        } else {
            postSearchHistory({
                search: searchState.searchValue,
                uniqueId: deviceID,
                source: legalSourceID,
                campaignId: legalCompanyID,
            })
        }
        router.push('/results')
    }


    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    React.useEffect(() => {
        if (!!searchState.searchValue)
            updateResultsState()
    }, [searchState.searchValue])


    return (
        <div className='history-wrapper'>
            <MainHeader />

            {favoritesIsFetching && <Loader />}

            <div className='content-wrapper'>
                <Table
                    showHeader={false}
                    locale={{ emptyText: 'Təəssüf ki, heç bir məlumat tapılmadı' }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={favoritesData.data}
                />
            </div>
        </div>
    )
}