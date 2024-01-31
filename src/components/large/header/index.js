import React from 'react'
import { Avatar, Image, Input } from 'antd'
import Icon from '@ant-design/icons';
import { ForumIcon, HammerIcon, NotificationIcon, SearchIcon, SpellCheckIcon } from '@/assets/icons';
import { useSearchContext } from '@/context/search-context';
import { TEST_RESULTS_LIST } from '@/constants/test-data';
import { useResultsContext } from '@/context/results-context';
import { useRouter } from 'next/router';
import { useSearch } from '@/hooks/use-search';


const filtersRow = [
    { value: 'h', label: 'Hüquqi araşdırma', icon: SearchIcon, size: 14 },
    { value: 'm', label: 'Məhkəmə qərarları', icon: HammerIcon, size: 15 },
    { value: 's', label: 'Spell check', icon: SpellCheckIcon, size: 14 },
    { value: 'f', label: 'Forum', icon: ForumIcon, size: 14 },
]


export const Header = (props) => {
    let { } = props
    const router = useRouter()
    const { searchState, setSearchState } = useSearchContext()
    const { setResultsState, colors } = useResultsContext()


    const { data = [], refetch, isFetching } = useSearch(searchState.searchValue, () => { })


    function getSearchDataAndKeys() {
        setResultsState({ loading: isFetching })

        // let response = getSearchData({ query_strig: searchState.searchValue })
        refetch()
        setResultsState({ list: data[0] })
        router.push('/results')
        console.log('@@@@@', data[0])

        let keys = []
        let searchWords = searchState.searchValue?.split(' ')

        // let filteredResults = TEST_RESULTS_LIST?.filter(item =>
        //     searchWords.every(word => !!word &&
        //         item.text.toLowerCase().includes(word.toLowerCase())
        //     )
        // )
        if (searchWords.length)
            keys = getKeys()

        setResultsState({
            // loading: false,
            searchKeys: keys,
            // list: filteredResults,
        })

    }

    // function getSearchDataAndKeys() {
    //     setResultsState({ loading: true })
    //     router.push('/results')
    //     let keys = []
    //     let searchWords = searchState.searchValue?.split(' ')
    //     let filteredResults = TEST_RESULTS_LIST?.filter(item =>
    //         searchWords.every(word => !!word &&
    //             item.text.toLowerCase().includes(word.toLowerCase())
    //         )
    //     )
    //     if (!!filteredResults.length)
    //         keys = getKeys()

    //     setTimeout(() =>
    //         setResultsState({
    //             loading: false,
    //             searchKeys: keys,
    //             list: filteredResults,
    //         }), 1000)
    // }


    function getKeys() {
        let words = searchState.searchValue?.toLowerCase().match(/\b\w+\b/g)
        return words?.map((item, i) => ({ id: i, label: item, color: colors[i] }))
    }

    getKeys()



    return (
        <div className='header-wrapper'>
            <Image
                src='/assets/SVG/legalens-logo.svg'
                className='logo'
                preview={false}
                onClick={() => router.push('/')}
            />
            <div className='search-wrapper'>
                {
                    // filtersRow.map(item =>
                    //     <FilterButton
                    //         key={item.value}
                    //         selected={searchState.activeFilter}
                    //         setSelected={(v) => setSearchState({ activeFilter: v })}
                    //         {...item}
                    //     />
                    // )
                }
                <div className='searcher'>
                    <Input
                        value={searchState.searchValue}
                        onChange={(e) => setSearchState({ searchValue: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && getSearchDataAndKeys()}
                    />
                    <div className='button' onClick={getSearchDataAndKeys}>
                        <Icon component={SearchIcon} className='icon' />
                        <div className='label'>Axtar</div>
                    </div>
                </div>
            </div>
            <div className='profile-wrapper'>
                <div className='notification-wrapper'>
                    <Icon component={NotificationIcon} className='icon' />
                    <div className='count-circle'>
                        <div className='text'>3</div>
                    </div>
                </div>
                <Avatar src={'/assets/PNG/wow-cat.png'} size={45} />
            </div>
        </div>
    )
}



const FilterButton = (props) => {
    let { label, value, icon, size, selected, setSelected } = props
    let isSelected = selected === value

    return (
        <div className={`filter-button${isSelected ? '-selected' : ''}`} onClick={() => setSelected(value)}>
            <Icon component={icon} className='icon' style={{ fontSize: size }} />
            <div className='label'>{label}</div>
        </div>
    )
}