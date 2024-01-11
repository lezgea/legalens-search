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
    const { resultsState, setResultsState } = useResultsContext()


    function getRandomRGB() {
        let o = Math.round, r = Math.random, s = 200;
        return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')'
    }


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
        let searchWords = searchState.searchValue?.split(' ')
        return searchWords.map((item, i) => ({ id: i, label: item, color: getRandomRGB() }))
    }


    function highlightWords(text, words, color) {
        const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi')
        return text.replace(regex, `<span class="marked" style="background-color: ${color};">$&</span>`)
    }


    function getMarkedText(originalText = '') {
        if (!!resultsState.searchKeys?.length) {
            let words = resultsState.searchKeys.map(item => item.label)
            let colors = resultsState.searchKeys.map(item => item.color)
            const highlightedText = highlightWords(originalText, words, colors[0]);
            return highlightedText
        }
    }


    React.useEffect(() => {
        getMarkedText()
    }, [])


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
                    </div>
                </div>
            </div>
        </div>
    )
}



const ResultCard = (props) => {
    let { label, description, text, checked } = props

    return (
        <div className='result-card-wrapper'>
            <Checkbox checked={checked} onChange={() => { }} />
            <div className='result-card'>
                <div className='label'>{label}</div>
                <div className='description'>{description}</div>
                <LinearFilter />
                <div className='text' dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
        </div >
    )
}



const LinearFilter = (props) => {
    let { } = props

    return (
        <div className='linear-filter-wrapper'>
            <div className='linear-filter'></div>
        </div>
    )
}

