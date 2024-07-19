import React from 'react'
import { useRouter } from 'next/router'
import { useSearchContext } from '@/context/search-context';
import { Space, Table, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useResultsContext } from '@/context/results-context';
import { MainHeader } from '@/components/large';
import { v4 as uuidv4 } from 'uuid';
import { useSearchHistoryData, useSearchHistoryDelete, useSearchHistoryMutation } from '@/hooks/use-search-history';
import { getAccessToken } from '@/utils/cookies';
import moment from 'moment/moment';
import Loader from '@/components/large/loader';


const { confirm } = Modal;


export default function HistoryModule() {
    const { searchState, setSearchState } = useSearchContext()
    const { setResultsState, setColors } = useResultsContext()
    const router = useRouter()

    const { mutate: postSearchHistory, isSuccess: isSuccessPost, isLoading: postSearchHistoryLoading } = useSearchHistoryMutation()
    const { mutate: deleteSearchHistory, isSuccess: isSuccessDelete, isLoading: deleteSearchHistoryLoading } = useSearchHistoryDelete()
    const { data: historyData, refetch: refetchHistory, isFetching: historyIsFetching } = useSearchHistoryData()


    function onDeleteHistoryItem(ID) {
        confirm({
            centered: true,
            title: 'Tarixçəni silmək istədiyinizə əminsinizmi?',
            icon: <ExclamationCircleFilled />,
            okText: 'Bəli',
            okType: 'danger',
            cancelText: 'Xeyr',
            onOk() {
                deleteSearchHistory(ID)
                if (isSuccessDelete)
                    refetchHistory()
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
        {
            key: 'action',
            width: '50px',
            render: (_, record) => (
                <Space size="small">
                    <DeleteOutlined className='list-delete-icon' onClick={() => onDeleteHistoryItem(record.id)} />
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

            {(historyIsFetching || postSearchHistoryLoading) && <Loader />}

            <div className='content-wrapper'>
                <Table
                    showHeader={false}
                    locale={{ emptyText: 'Təəssüf ki, heç bir məlumat tapılmadı' }}
                    // rowSelection={rowSelection}
                    columns={columns}
                    dataSource={historyData.data}
                />
            </div>
        </div>
    )
}
