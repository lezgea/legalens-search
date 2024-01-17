import React from 'react'
import { HeaderForMain } from './components/header-for-main'
import { TEST_RESULTS_LIST } from '@/constants/test-data'
import { useRouter } from 'next/router'
import Icon from '@ant-design/icons';
import { SearchIcon } from '@/assets/icons';
import { useSearchContext } from '@/context/search-context';
import { Input } from 'antd';
import { useResultsContext } from '@/context/results-context';
import { OutlinedButton } from '@/components/small/buttons/outlined-button';


export default function MainModule() {
    const { searchState, setSearchState } = useSearchContext()
    const { setResultsState, colors } = useResultsContext()
    const router = useRouter()


    function getSearchDataAndKeys() {
        setResultsState({ loading: true })
        router.push('/results')
        let keys = []
        let searchWords = searchState.searchValue?.split(' ')
        let filteredResults = TEST_RESULTS_LIST?.filter(item =>
            searchWords.every(word => !!word &&
                item.text.toLowerCase().includes(word.toLowerCase())
            )
        )
        if (!!filteredResults.length)
            keys = getKeys()

        setTimeout(() =>
            setResultsState({
                loading: false,
                searchKeys: keys,
                list: filteredResults,
            }), 1000)
    }


    function getKeys() {
        let words = searchState.searchValue?.toLowerCase().match(/\b\w+\b/g)
        return words.map((item, i) => ({ id: i, label: item, color: colors[i] }))
    }


    return (
        <div className='uniq-wrapper'>
            <HeaderForMain />
            <div className='main-wrapper'>
                <div className='title-wrapper'>
                    <div className='label'>Lorem ipsum dolor</div>
                    <div className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </div>
                </div>
                <div className='search-wrapper'>
                    <div className='search-box'>
                        <Icon component={SearchIcon} className='question-icon' />
                        <Input
                            value={searchState.searchValue}
                            className='input'
                            onChange={(e) => setSearchState({ searchValue: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && getSearchDataAndKeys()}
                        />
                        <Icon component={SearchIcon} className='search-icon' />
                    </div>
                    <div className='search-filters-wrapper'>
                        <OutlinedButton label='Praktika sahesi' />
                        <div className='button'>Praktika sahəsi</div>
                        <div className='button'>Praktika sahəsi</div>
                        <div className='button'>Praktika sahəsi</div>
                    </div>
                </div>
            </div>
        </div>
    )
}