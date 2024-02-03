import React from 'react';
import { Checkbox, Modal } from 'antd';
import { Header, Loader } from '@/components/large';
import { SideFilterBar } from './components';
import { ActionButton, SearchKey } from '@/components/small';
import { useResultsContext } from '@/context/results-context';
import {
    ArrowDownIcon,
    CirclesIcon,
    DocumentIcon,
    EditIcon,
    FolderIcon,
    HalfListIcon,
    ListIcon,
    NotificationIcon,
    StatisticsIcon
} from '@/assets/icons';
import { Empty, notification } from 'antd';
import Link from 'next/link';
import { Input } from 'antd';
import { ResultsListSkeleton } from '@/components/medium';
import { useCrop } from '@/hooks/use-crop';

const { Search } = Input;



const topRightActions = [
    { id: 1, label: 'Düzəliş et', icon: EditIcon, size: 16 },
    { id: 2, label: 'Xəbərdar et', icon: NotificationIcon, size: 16 },
    { id: 3, label: 'Qovluğa əlvə et', icon: FolderIcon, size: 16 },
    { id: 4, label: '', icon: StatisticsIcon, size: 18 },
    { id: 5, label: '', icon: ListIcon, size: 18 },
    { id: 6, label: '', icon: HalfListIcon, size: 18 },
    { id: 7, label: '', icon: CirclesIcon, size: 18 },
]

const bottomLeftActions = [
    { id: 1, label: 'Qovluğa əlavə et', icon: FolderIcon, size: 16 },
    { id: 2, label: 'Çap versiyası', icon: DocumentIcon, size: 16 },
]

const bottomRightActions = [
    { id: 3, label: 'Sırala', icon: null, size: 16 },
    { id: 4, label: 'Tarix', icon: ArrowDownIcon, size: 13 },
]


export default function ResultsModule() {
    const { resultsState, colors } = useResultsContext()
    const [showModal, setShowModal] = React.useState(false)


    function handleShowModal() {
        setShowModal(true)
    }


    function handleOk() {
        setShowModal(false)
    }


    function handleCancel() {
        setShowModal(false)
    }

    // return <Loader />

    return (
        <div className='uniq-wrapper'>
            <Header />
            <div className='results-inner-wrapper'>
                <SideFilterBar />
                <div className='results-content-wrapper'>
                    <div className='list-filters-fixed'>
                        <div className='filter-items-wrapper'>
                            {!!resultsState.searchKeys?.length && resultsState.searchKeys?.map((item, i) => <SearchKey key={i} color={colors[i]} label={item} />)}
                        </div>
                        <div className='action-buttons-wrapper'>
                            {topRightActions.map(item => <ActionButton key={item.id} color='gray' onClick={handleShowModal} {...item} />)}
                        </div>
                    </div>
                    <div className='results-list-wrapper'>
                        <div className='list-header-wrapper'>
                            <Checkbox checked={false} onChange={() => { }} />
                            <div className='list-header'>
                                <div className='action-buttons-wrapper'>
                                    {bottomLeftActions.map(item => <ActionButton key={item.id} color='white' onClick={handleShowModal} {...item} />)}
                                </div>
                                <div className='action-buttons-wrapper'>
                                    {bottomRightActions.map(item => <ActionButton key={item.id} color='white' onClick={handleShowModal} {...item} />)}
                                </div>
                            </div>
                        </div>
                        {
                            resultsState.loading &&
                            <ResultsListSkeleton />
                        }
                        {
                            !resultsState.loading && resultsState?.list?.map((item, i) =>
                                <ResultCard
                                    key={i}
                                    {...item[1]}
                                    text={item[1].Crop}
                                />
                            )
                        }
                        {
                            !resultsState.loading && !resultsState?.list?.length &&
                            <div className='empty-content'>
                                <Empty description={'No Results'} />
                            </div>
                        }
                    </div>
                </div>

                <Modal
                    width={800}
                    title="Edit Item"
                    open={showModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div style={{ height: 400 }}></div>
                </Modal>
            </div>
        </div>
    )
}



const ResultCard = (props) => {
    let { Headline: label, description, Percentages, text, checked, date } = props
    const { resultsState, setSelectedResult, colors } = useResultsContext()
    const [api, contextHolder] = notification.useNotification();

    const [linerData, setLinerData] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            crop_id: '',
            data: [],
        }
    )
    const { data = [], refetch, isFetching, error } = useCrop(linerData.crop_id, () => { })


    function onSetDetails() {
        setSelectedResult({ label, description, text })
    }


    function onSelectCrop(crop) {
        setLinerData({ crop_id: crop })
        refetch()
    }

    if (error) {
        api.error({
            message: error,
            // description:
            //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        })
    }
    console.log('=====', data)

    React.useEffect(() => {
        setLinerData({ data: [...Percentages] })
    }, [Percentages])


    return (
        <div className='result-card-wrapper'>
            <Checkbox checked={checked} onChange={() => { }} />
            <div className='result-card'>
                <div className='date'>{date}</div>
                <Link
                    className='label'
                    href='/result-details'
                    onClick={onSetDetails}
                >
                    {label}
                </Link>
                <div className='description'>{description}</div>
                <div className='linear-filter-wrapper'>
                    <div className='linear-filter'>
                        {
                            linerData?.data?.map((item, i) => {
                                let backgroundColor = colors[item[1]]
                                let marginLeft = `${(item[2] * 100)}%`

                                return (
                                    <div
                                        key={i}
                                        className='item'
                                        style={{ marginLeft: marginLeft }}
                                        onClick={() => onSelectCrop(item[3])}
                                    >
                                        <div className='item-marker' style={{ backgroundColor: backgroundColor }}></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='text-container'>
                    <div className='text truncate' dangerouslySetInnerHTML={{ __html: text }}></div>
                </div>
            </div>
        </div>
    )
}


