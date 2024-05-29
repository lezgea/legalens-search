import React, { useEffect, useLayoutEffect } from 'react';
import { Checkbox, Modal, Spin } from 'antd';
import { Header } from '@/components/large';
import { SideFilterBar } from './components';
import { ActionButton, SearchKey } from '@/components/small';
import { useResultsContext } from '@/context/results-context';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CirclesIcon,
    DocumentIcon,
    EditIcon,
    FolderIcon,
    HalfListIcon,
    ListIcon,
    NotificationIcon,
    StarIcon,
    StatisticsIcon
} from '../../assets/icons';
import { Empty, notification } from 'antd';
import Link from 'next/link';
import Icon from '@ant-design/icons';
import { Input } from 'antd';
import { ResultsListSkeleton } from '@/components/medium';
import { useCrop } from '@/hooks/use-crop';
import { useSearchContext } from '@/context/search-context';
import { useFavoritesMutation } from '@/hooks/use-favorites';
import useNotification from 'antd/es/notification/useNotification';

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
    const { searchState, setSearchState } = useSearchContext()
    const { resultsState, colors, setResultsState, setColors } = useResultsContext()
    const [showModal, setShowModal] = React.useState(false)
    const [cardIndex, setCardIndex] = React.useState(null)
    const [buttonsShowIndex, setButtonsShowIndex] = React.useState(null)
    const [startFetching, setStartFetching] = React.useState(false)
    const [scrollToTop, setScrollToTop] = React.useState(false)
    const listRef = React.createRef()


    function handleShowModal() {
        setShowModal(true)
    }


    function handleOk() {
        setShowModal(false)
    }


    function handleCancel() {
        setShowModal(false)
    }


    function removeSearchKey(item) {
        let newString = ''
        let newSearchArr = resultsState.searchKeys?.filter(key => key !== item)
        newSearchArr.map(item => newString = newString + ' ' + item)
        setResultsState({ searchKeys: newSearchArr, loading: true, triggerSearch: !resultsState.triggerSearch })
        setSearchState({ searchValue: newString })
    }


    function onScrollText(e) {
        const bottom = e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight;
        if (!!bottom) {
            setSearchState({ offset: searchState.offset + 1 })
            setResultsState({ spinnerLoading: true })
        }
    }


    React.useLayoutEffect(() => {
        listRef.current.scrollTo(0, 0)
    }, [scrollToTop])


    return (
        <div className='uniq-wrapper'>
            <Header />
            <div className='results-inner-wrapper'>
                <div className='side-filter-bar-wrapper'>
                    <SideFilterBar />
                </div>
                <div className='results-content-wrapper'>
                    <div
                        ref={listRef}
                        className='results-list-wrapper'
                        onScroll={onScrollText}
                    >
                        <div className='list-header-wrapper'>
                            <div className='list-header'>
                                <div className='filter-items-wrapper'>
                                    {
                                        !resultsState.loading && !!resultsState.searchKeys?.length && resultsState.searchKeys?.map((item, i) =>
                                            <SearchKey
                                                key={i}
                                                color={colors[i]}
                                                label={item}
                                                showClose={resultsState.searchKeys?.length > 1}
                                                onClick={() => removeSearchKey(item)}
                                            />
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
                                    {...item[2]}
                                    item={item}
                                    id={item[0] || null}
                                    text={item[2].Crop}
                                    searchValue={searchState?.searchValue}
                                    cardIndex={cardIndex}
                                    setCardIndex={setCardIndex}
                                    buttonsShowIndex={buttonsShowIndex}
                                    setButtonsShowIndex={setButtonsShowIndex}
                                />
                            )
                        }
                        {
                            !resultsState.loading && !resultsState?.list?.length &&
                            <div className='empty-content'>
                                <Empty description={'Məlumat Tapılmadı'} />
                            </div>
                        }
                        {
                            resultsState.spinnerLoading &&
                            <div className='list-loader'>
                                <Spin size="large" />
                            </div>
                        }
                    </div>
                </div>

                <div className='scroll-to-top-button' onClick={() => setScrollToTop(!scrollToTop)}>
                    <Icon component={ArrowDownIcon} className='icon' style={{ transform: 'rotate(0.5turn)' }} />
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
        id,
        Headline: label,
        description,
        Percentages,
        text,
        searchValue,
        madde_id,
        bolme_id,
        fesil_id,
        mecelle_id,
        index,
        cardIndex,
        setCardIndex,
        buttonsShowIndex,
        setButtonsShowIndex,
    } = props

    const { showNotification } = useNotification()
    const { searchState } = useSearchContext()
    const { resultsState, setSelectedResult, colors } = useResultsContext()
    const [api, contextHolder] = notification.useNotification();

    const [linerData, setLinerData] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            crop_id: '',
            data: [],
            text: '',
            loading: false,
        }
    )
    const { data = [], refetch, isFetching, error } = useCrop({ position: linerData.crop_id, keyword: searchState.searchValue, search_as_phrase: resultsState.search_as_phrase }, () => { })
    const { mutate: postFavorite, isSuccess, isLoading: postFavoriteLoading } = useFavoritesMutation()


    function onSetDetails() {
        setSelectedResult({ label, description, text })
    }


    function onSelectCrop(crop) {
        setLinerData({ crop_id: crop })
        if (linerData.crop_id === crop)
            refetch()
    }


    function onAddToFavorites(e) {
        e.preventDefault()
        postFavorite({ articleId: Number(madde_id) }, favoriteMutationOptions)
    }


    const favoriteMutationOptions = {
        onSuccess: () => {
            showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' });
            // refetchFolders();
        },
        onError: (res) => {
            showNotification({ title: res?.response?.data?.message || 'Uğursuz əməliyyat!', variant: 'error' });
        },
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
        setLinerData({ loading: false })
        if (!!linerData.crop_id) {
            setLinerData({
                text: data?.data,
                loading: false,
            })
        }
    }, [linerData.crop_id])



    return (
        <Link
            href={`/result-details/${bolme_id}_${fesil_id}_${madde_id}_${mecelle_id}_${searchValue}`}
            className='result-card-wrapper'
            onMouseOver={() => setButtonsShowIndex(index)}
        >
            <div className={`result-card${cardIndex == index ? "-animated" : ""}`}>
                {
                    buttonsShowIndex == index &&
                    <div className='action-button-wrapper'>
                        <ActionButton
                            color='gray'
                            onClick={onAddToFavorites}
                            icon={FolderIcon}
                            label='Qovluqa +'
                            style={{ marginRight: 10 }}
                        />
                        <ActionButton
                            color='gray'
                            onClick={onAddToFavorites}
                            icon={StarIcon}
                            label='Seçilmişlərə +'
                        />
                    </div>
                }
                <div className='white-opacity-box'>
                </div>
                <div
                    className='action-btn'
                    onClick={(e) => {
                        e?.preventDefault();
                        index === cardIndex
                            ? setCardIndex(null)
                            : setCardIndex(index)
                    }}
                >
                    <Icon component={ArrowDownIcon} className='icon' style={{ transform: index === cardIndex ? 'rotate(0.5turn)' : 'rotate(0)' }} />
                </div>
                <Link className='label' href={`/result-details/${bolme_id}_${fesil_id}_${madde_id}_${mecelle_id}_${searchValue}`}>
                    <div dangerouslySetInnerHTML={{ __html: label }}></div>
                </Link>
                <div className='description' dangerouslySetInnerHTML={{ __html: description }}></div>
                <div className='linear-filter-wrapper'>
                    <div className='linear-filter' onClick={(e) => e?.preventDefault()}>
                        {
                            linerData?.data?.map((item, i) => {
                                let backgroundColor = item[2]
                                let marginLeft = `${(item[1] * 100)}%`

                                return (
                                    <div
                                        key={i}
                                        className='item'
                                        style={{ marginLeft: marginLeft }}
                                        onClick={(e) => {
                                            e?.preventDefault();
                                            onSelectCrop(item[0]);
                                            setCardIndex(index);
                                        }}
                                    >
                                        <div className='item-marker' style={{ backgroundColor: backgroundColor }}>
                                            {
                                                linerData.crop_id == item[0] &&
                                                <div className='item-selected'></div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    isFetching &&
                    <div className='text-container'>
                        <div className='text-skeleton' />
                        <div className='text-skeleton' />
                        <div className='text-skeleton' />
                    </div>
                }
                {
                    (linerData.text || data.data) &&
                    <div className='text-container'>
                        <div className={`text${cardIndex == index ? "-full" : ""} truncate`} dangerouslySetInnerHTML={{ __html: linerData.text || data.data }}></div>
                    </div>
                }
            </div>
        </Link >
    )
}


