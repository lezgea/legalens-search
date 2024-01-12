import React from 'react';
import { Checkbox } from 'antd';
import { Header } from '@/components/large';
import { ListFiltersFixed, SideFilterBar } from './components';
import { ActionButton, SearchKey } from '@/components/small';
import { useResultsContext } from '@/context/results-context';
import { useSearchContext } from '@/context/search-context';
import {
    ArrowDownIcon,
    CirclesIcon,
    DocumentIcon,
    EditIcon,
    FilledNotificationIcon,
    FolderIcon,
    HalfListIcon,
    ListIcon,
    StatisticsIcon
} from '@/assets/icons';
import { TEST_RESULTS_LIST } from '@/constants/test-data';
import { Empty } from 'antd';
import Link from 'next/link';



const topRightActions = [
    { id: 1, label: 'Düzəliş et', icon: EditIcon, size: 16 },
    { id: 2, label: 'Xəbərdar et', icon: FilledNotificationIcon, size: 16 },
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
    const { searchState } = useSearchContext()
    const { resultsState, setResultsState, colors } = useResultsContext()


    function getSearchDataAndKeys() {
        let keys = []
        let searchWords = searchState.searchValue?.split(' ')
        let filteredResults = TEST_RESULTS_LIST?.filter(item =>
            searchWords.every(word => !!word &&
                item.text.toLowerCase().includes(word.toLowerCase())
            )
        )
        if (!!filteredResults.length)
            keys = getKeys()

        setResultsState({
            searchKeys: keys,
            list: filteredResults,
        })
    }


    function getKeys() {
        let words = searchState.searchValue?.toLowerCase().match(/\b\w+\b/g)
        return words.map((item, i) => ({ id: i, label: item, color: colors[i] }))
    }


    function highlightWords(text, searchKeys) {
        let highlightedText = text
        searchKeys.forEach(item => {
            const regex = new RegExp(`\\b${item.label}\\b`, 'gi')
            highlightedText = highlightedText.replace(regex, `<span class="marked" style="background-color: ${item.color};">$&</span>`)
        })
        return highlightedText
    }


    function getMarkedText(originalText = '') {
        if (!!resultsState.searchKeys?.length) {
            const highlightedText = highlightWords(originalText, resultsState.searchKeys)
            // countWordOccurrences(originalText)
            return highlightedText
        }
    }



    return (
        <div className='uniq-wrapper'>
            <Header onSearch={getSearchDataAndKeys} />
            <div className='results-inner-wrapper'>
                <SideFilterBar />
                <div className='results-content-wrapper'>
                    <div className='list-filters-fixed'>
                        <div className='filter-items-wrapper'>
                            {resultsState.searchKeys.map(item => <SearchKey key={item.id} {...item} />)}
                        </div>
                        <div className='action-buttons-wrapper'>
                            {topRightActions.map(item => <ActionButton key={item.id} color='gray' {...item} />)}
                        </div>
                    </div>
                    <div className='results-list-wrapper'>
                        <div className='list-header-wrapper'>
                            <Checkbox checked={false} onChange={() => { }} />
                            <div className='list-header'>
                                <div className='action-buttons-wrapper'>
                                    {bottomLeftActions.map(item => <ActionButton key={item.id} color='white' {...item} />)}
                                </div>
                                <div className='action-buttons-wrapper'>
                                    {bottomRightActions.map(item => <ActionButton key={item.id} color='white' {...item} />)}
                                </div>
                            </div>
                        </div>
                        {
                            resultsState?.list?.map(item =>
                                <ResultCard
                                    {...item}
                                    key={item.id}
                                    text={getMarkedText(item.text)}
                                />
                            )
                        }
                        {
                            !resultsState?.list?.length &&
                            <div className='empty-content'>
                                <Empty description={'No Results'} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



const ResultCard = (props) => {
    let { label, description, text, checked } = props
    const { resultsState, setResultsState } = useResultsContext()

    const [linerData, setLinerData] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            data: [],
            step: 0,
        }
    )


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

        setLinerData({
            data: data,
            step: step,
        })
    }


    React.useEffect(() => {
        countWordOccurrences()
    }, [resultsState.searchKeys])


    return (
        <div className='result-card-wrapper'>
            <Checkbox checked={checked} onChange={() => { }} />
            <div className='result-card'>
                <Link className='label' href='/result-detail'>{label}</Link>
                <div className='description'>{description}</div>
                <div className='linear-filter-wrapper'>
                    <div className='linear-filter'>
                        {
                            linerData.data.map((item, i) =>
                                <div key={i} className='item'>
                                    <div className='item-marker' style={{ backgroundColor: item.color }}></div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='text' dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
        </div >
    )
}


