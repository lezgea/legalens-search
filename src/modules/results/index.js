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
import { RESULTS_STATE_INITIAL } from '@/constants/initial-states';



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

    // let filteredResults = React.useMemo(() =>
    //     RESULTS_STATE_INITIAL?.list?.filter(item => item.text.toLowerCase().includes(searchState.searchValue.toLowerCase())),
    //     [searchState.searchValue]
    // )

    function getRandomRGB() {
        let o = Math.round, r = Math.random, s = 200;
        return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')'
    }

    function getSearchDataAndKeys() {
        let keys = []
        let filteredResults = RESULTS_STATE_INITIAL?.list?.filter(item => item.text.toLowerCase().includes(searchState.searchValue.toLowerCase()))
        if (!!filteredResults.length) {
            let searchWords = searchState.searchValue?.split(' ')
            keys = searchWords.map((item, i) => ({ id: i, label: item, color: getRandomRGB() }))
        }
        setResultsState({
            searchKeys: keys,
            list: filteredResults,
        })
    }

    console.log('####', Math.random())

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
                                    key={item.id}
                                    {...item}
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
                <div className='text'>{text}</div>
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

