import React from 'react'
import Icon from '@ant-design/icons';
import { useRouter } from 'next/router'
import { FacebookIcon, InstagramIcon, LinkedinIcon, ThinSearchIcon } from '../../assets/icons';
import { useSearchContext } from '@/context/search-context';
import { Input, Table } from 'antd';
import { useResultsContext } from '@/context/results-context';
import { Image } from 'antd'
import { useSearch } from '@/hooks/use-search';
import { MainHeader } from '@/components/large';
import { v4 as uuidv4 } from 'uuid';
import { useSearchHistoryData, useSearchHistoryMutation } from '@/hooks/use-search-history';
import { getAccessToken } from '@/utils/cookies';



export default function HistoryModule() {
    const { searchState, setSearchState } = useSearchContext()
    const { setResultsState, setColors } = useResultsContext()
    const router = useRouter()

    const { data = [], refetch, isFetching } = useSearch({ query: searchState.searchValue, offset: searchState.offset }, () => { })
    const { mutate: postSearchHistory, isSuccess, isLoading: postSearchHistoryLoading } = useSearchHistoryMutation()
    const { data: historyData, refetch: refetchHistory, isFetching: historyIsFetching } = useSearchHistoryData()


    console.log('$$$$$', historyData)

    const columns = [
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
        console.log('#')
        setResultsState({ loading: isFetching })
        if (!!data?.length) {
            // setResultsState({ list: data[0], searchKeys: data[1] })
            // setColors([...Object.values(data[2])])
        } else {
            setResultsState({ list: [], searchKeys: [] })
            setColors([])
        }
    }


    async function getSearchDataAndKeys(value) {
        await refetch()
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
            <div className='content-wrapper'>
                <Table
                    showHeader={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={historyData.data}
                />
            </div>
        </div>
    )
}