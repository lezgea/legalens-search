import React from 'react';
import { Checkbox, Modal } from 'antd';
import { Header } from '@/components/large';
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
} from '../../assets/icons';
import { Empty, notification } from 'antd';
import Link from 'next/link';
import { Input } from 'antd';
import { ResultsListSkeleton } from '@/components/medium';
import { useCrop } from '@/hooks/use-crop';
import Loader from '@/components/large/loader';

const { Search } = Input;


const topRightActions = [
    // { id: 3, label: 'Sırala', icon: null, size: 16 },
    { id: 4, label: 'Tarix', icon: ArrowDownIcon, size: 13 },
]

const bottomRightActions = [
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


export default function ResultsModule() {
    const { resultsState, colors } = useResultsContext()
    const [showModal, setShowModal] = React.useState(false)
    const [cardIndex, setCardIndex] = React.useState(null)


    function handleShowModal() {
        setShowModal(true)
    }


    function handleOk() {
        setShowModal(false)
    }


    function handleCancel() {
        setShowModal(false)
    }


    return (
        <div className='uniq-wrapper'>
            <Header />
            <div className='results-inner-wrapper'>
                <SideFilterBar />
                <div className='results-content-wrapper'>
                    <div className='results-list-wrapper'>
                        <div className='list-header-wrapper'>
                            <div className='list-header'>
                                <div className='filter-items-wrapper'>
                                    {
                                        !!resultsState.searchKeys?.length && resultsState.searchKeys?.map((item, i) =>
                                            <SearchKey key={i} color={colors[i]} label={item} />
                                        )
                                    }
                                </div>
                                <div className='action-buttons-wrapper'>
                                    {/* {topRightActions.map(item => <ActionButton key={item.id} color='white' onClick={handleShowModal} {...item} />)} */}
                                </div>
                                {/* <div className='action-buttons-wrapper'>
                                    {bottomLeftActions.map(item => <ActionButton key={item.id} color='white' onClick={handleShowModal} {...item} />)}
                                </div>
                                <div className='action-buttons-wrapper'>
                                    {bottomRightActions.map(item => <ActionButton key={item.id} color='white' onClick={handleShowModal} {...item} />)}
                                </div> */}
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
                                    index={i}
                                    {...item[1]}
                                    item={item}
                                    text={item[1].Crop}
                                    cardIndex={cardIndex}
                                    setCardIndex={setCardIndex}
                                />
                            )
                        }
                        {
                            !resultsState.loading && !resultsState?.list?.length &&
                            <div className='empty-content'>
                                <Empty description={'Məlumat Tapılmadı'} />
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
    let {
        Headline: label,
        description,
        Percentages,
        text,
        date,
        madde_id,
        bolme_id,
        fesil_id,
        index,
        cardIndex,
        setCardIndex,
    } = props
    const { resultsState, setSelectedResult, colors } = useResultsContext()
    const [api, contextHolder] = notification.useNotification();

    const [linerData, setLinerData] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            crop_id: '',
            data: [],
            text: '',
        }
    )
    const { data = [], refetch, isFetching, error } = useCrop(linerData.crop_id, () => { })

    let mecelle_id = Percentages[0][3]?.split('.')[0]


    function onSetDetails() {
        setSelectedResult({ label, description, text })
    }


    function onSelectCrop(crop) {
        setLinerData({ crop_id: crop })
        if (linerData.crop_id === crop)
            refetch()
    }


    if (error)
        api.error({ message: error })


    React.useEffect(() => {
        setLinerData({
            data: [...Percentages],
            text: text,
        })
    }, [Percentages])


    React.useEffect(() => {
        if (!!linerData.crop_id)
            setLinerData({ text: data?.data })
    }, [linerData.crop_id])


    return (
        <Link
            href={`/result-details/${bolme_id}_${fesil_id}_${madde_id}_${mecelle_id}`}
            className='result-card-wrapper'
        // onMouseEnter={() => setTimeout(() => setCardIndex(index), 1500)}
        // onMouseOver={() => setCardIndex(false)}
        >
            <div className={`result-card${cardIndex == index ? "-animated" : ""}`}>
                <div className='date'>
                    <ActionButton
                        color='gray'
                        onClick={(e) => {
                            e?.preventDefault();
                            index === cardIndex
                                ? setCardIndex(null)
                                : setCardIndex(index)
                        }}
                        label={index === cardIndex ? 'Gizlət' : 'Ətraflı'}
                    />
                </div>
                <Link className='label' href={`/result-details/${bolme_id}_${fesil_id}_${madde_id}_${mecelle_id}`}>
                    <div dangerouslySetInnerHTML={{ __html: label }}></div>
                </Link>
                <div className='description' dangerouslySetInnerHTML={{ __html: description }}></div>
                <div className='linear-filter-wrapper'>
                    <div className='linear-filter' onClick={(e) => e?.preventDefault()}>
                        {
                            linerData?.data?.map((item, i) => {
                                let backgroundColor = colors[item[1]]
                                let marginLeft = `${(item[2] * 100)}%`

                                return (
                                    <div
                                        key={i}
                                        className='item'
                                        style={{ marginLeft: marginLeft }}
                                        onClick={(e) => { e?.preventDefault(); onSelectCrop(item[3]) }}
                                    >
                                        <div className='item-marker' style={{ backgroundColor: backgroundColor }}></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    isFetching
                        ?
                        <div className='text-container'>
                            <div className='text-skeleton' />
                            <div className='text-skeleton' />
                            <div className='text-skeleton' />
                        </div>
                        :
                        <div className='text-container'>
                            {
                                !!(linerData.text || data?.data)
                                    ?
                                    <div className={`text${cardIndex == index ? "-full" : ""} truncate`} dangerouslySetInnerHTML={{ __html: linerData.text || data.data }}></div>
                                    :
                                    !isFetching && ""
                            }
                        </div>
                }
            </div>
        </Link>
    )
}


