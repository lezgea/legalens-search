import React from 'react'
import { HeaderForMain } from './components/header-for-main'
import { TEST_RESULTS_LIST } from '@/constants/test-data'
import { useRouter } from 'next/router'
import Icon from '@ant-design/icons';
import { CircleQuestionIcon, SearchIcon } from '@/assets/icons';
import { useSearchContext } from '@/context/search-context';
import { Button, Dropdown, Input } from 'antd';
import { useResultsContext } from '@/context/results-context';
import { OutlinedButton } from '@/components/small/buttons/outlined-button';
import { MAIN_PAGE_FILTER_BUTTONS } from '@/constants/initial-states';
import { LeftFixedBar } from './components/left-fixed-bar';



const items = [
    {
        key: '1',
        label: 'aTest',
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];


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
            <LeftFixedBar />
            <div className='main-wrapper'>
                <div className='title-wrapper'>
                    <div className='label'>Lorem ipsum dolor</div>
                    <div className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </div>
                </div>
                <div className='search-wrapper'>
                    <div className='search-box'>
                        <Icon component={CircleQuestionIcon} className='question-icon' />
                        <Input
                            value={searchState.searchValue}
                            className='input'
                            onChange={(e) => setSearchState({ searchValue: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && getSearchDataAndKeys()}
                        />
                        <Icon component={SearchIcon} className='search-icon' />
                    </div>
                    <div className='search-filters-wrapper'>
                        {
                            MAIN_PAGE_FILTER_BUTTONS.map((item, i) =>
                                <Dropdown
                                    trigger='click'
                                    menu={{ items: item.children }}
                                    placement="bottomLeft"
                                    overlayStyle={{ padding: 5 }}
                                >
                                    <Button className='outlined-button-white' style={{ borderRadius: 15 }}>
                                        <div className='label' style={{ fontSize: 14 }}>{item.label}</div>
                                    </Button>
                                </Dropdown>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}