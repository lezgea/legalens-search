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
} from '@/assets/icons';
import { Empty } from 'antd';
import Link from 'next/link';
import { Input } from 'antd';
import { ResultsListSkeleton } from '@/components/medium';

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
    const { resultsState } = useResultsContext()
    const [showModal, setShowModal] = React.useState(false)


    function highlightWords(text, searchKeys) {
        let highlightedText = text

        console.log('======', highlightedText)
        // console.log('!! SEARCH WORDS !!', searchKeys)
        searchKeys.forEach((item, i) => {

            // Escape special characters in the search key
            const escapedLabel = item.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // Define Azerbaijani characters within the regular expression pattern
            const azChars = '[çÇəƏğĞıİöÖşŞüÜ]';

            // Construct the regular expression pattern
            const regexPattern = `<em class=${i} >${escapedLabel}${azChars}+</em>`;

            // Create the regular expression object
            const regex = new RegExp(regexPattern, 'gi');

            // Replace matches with highlighted version
            highlightedText = highlightedText.replace(regex, `<em class="marked" style="background-color: ${item.color};">$&</em>`);


            // const regex = new RegExp(`\\<em class=${i} >${item.label}\\</em>`, 'gi')
            // highlightedText = highlightedText.replace(regex, `<em class="marked" style="background-color: ${item.color};">$&</em>`)
        })
        return highlightedText
    }


    function getMarkedText(originalText = '') {
        if (!!resultsState.searchKeys?.length) {
            const highlightedText = highlightWords(originalText, resultsState.searchKeys)
            return highlightedText
        }
    }


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
                    <div className='list-filters-fixed'>
                        <div className='filter-items-wrapper'>
                            {resultsState.searchKeys.map(item => <SearchKey key={item.id} {...item} />)}
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
                                    {...item[1]}
                                    key={i}
                                    text={getMarkedText(item[1].Crop)}
                                // text={item.Crop}
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
    let { Headline: label, description, text, checked, date } = props
    const { resultsState, setSelectedResult } = useResultsContext()

    const [linerData, setLinerData] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            data: [],
            step: 0,
        }
    )


    // counts words by searchkeys for result cards horizontal liner 
    function countWordOccurrences() {
        const words = text.toLowerCase().match(/\b\w+\b/g)
        let data = []
        let step = 0
        let wordsCount = 0
        let keys = resultsState.searchKeys.map(item => item.label)

        if (words) {
            words.forEach((word, index) => {
                wordsCount += 1
                let wordExist = keys.includes(word)
                if (wordExist) {
                    data.push(resultsState.searchKeys.find(item => item.label === word))
                } else {
                    data.push({ id: index, color: 'transparent' })
                }
            })
        }
        step = wordsCount / 100
        setLinerData({ data: data, step: step })
    }


    function onSetDetails() {
        setSelectedResult({ label, description, text })
    }


    React.useEffect(() => {
        if (!!resultsState.searchKeys?.length)
            countWordOccurrences()
    }, [resultsState.searchKeys])


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
                            linerData?.data?.map((item, i) =>
                                <div key={i} className='item'>
                                    <div className='item-marker' style={{ backgroundColor: item.color }}></div>
                                </div>
                            )
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


