import React from 'react';
import { Checkbox } from 'antd';
import { Header } from '@/components/large';
import { ListFiltersFixed, SideFilterBar } from './components';
import { ActionButton, SearchKey } from '@/components/small';
import { useSearchContext } from '@/context/search-context';
import { RESULTS_LIST } from '@/constants/test-data';
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
    const { searchState, searchKeys } = useSearchContext()

    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            filteredResults: [],
        }
    )


    function getSearchData() {
        let filteredResults = RESULTS_LIST.filter(item => item.text.toLowerCase().includes(searchState.searchValue.toLowerCase()))
        setState({ filteredResults: filteredResults })
    }


    function getInitialTestData() {
        setState({ filteredResults: RESULTS_LIST })
    }


    React.useEffect(() => {
        getInitialTestData()
    }, [])


    return (
        <div className='uniq-wrapper'>
            <Header onClickSearch={getSearchData} />
            <div className='results-inner-wrapper'>
                <SideFilterBar />
                <div className='results-content-wrapper'>
                    <div className='list-filters-fixed'>
                        <div className='filter-items-wrapper'>
                            {searchKeys.map(item => <SearchKey key={item.id} {...item} />)}
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
                            state.filteredResults.map(item =>
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

