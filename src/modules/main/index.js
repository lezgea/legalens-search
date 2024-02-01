import React from 'react'
import Icon from '@ant-design/icons';
import { HeaderForMain } from './components/header-for-main'
import { useRouter } from 'next/router'
import { CircleQuestionIcon, ThinSearchIcon } from '@/assets/icons';
import { useSearchContext } from '@/context/search-context';
import { Button, Dropdown, Input } from 'antd';
import { useResultsContext } from '@/context/results-context';
import { MAIN_PAGE_FILTER_BUTTONS } from '@/constants/initial-states';
import { LeftFixedBar } from './components/left-fixed-bar';
import Image from 'next/image';
import { useSearch } from '@/hooks/use-search';
import { getSearchData } from '@/api/search/getSearchData';



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
    const { setResultsState, setColors } = useResultsContext()
    const router = useRouter()

    const { data = [], refetch, isFetching } = useSearch(searchState.searchValue, () => { })


    React.useEffect(() => {
        setResultsState({ loading: isFetching })
        if (!!data.length) {
            setResultsState({ list: data[0], searchKeys: data[1] })
            setColors([...Object.values(data[2])])
            console.log('$$$$', data)
        }
    }, [isFetching])


    async function getSearchDataAndKeys() {
        refetch()
        router.push('/results')
    }


    return (
        <div className='uniq-wrapper'>
            <HeaderForMain />
            {/* <LeftFixedBar /> */}
            <div className='main-wrapper'>
                <div className='title-wrapper'>
                    <div className='label'>Lorem ipsum dolor</div>
                    <div className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </div>
                </div>
                <div className='search-wrapper'>
                    <div className='search-box'>
                        {/* <Icon component={CircleQuestionIcon} className='question-icon' /> */}
                        <Input
                            value={searchState.searchValue}
                            className='input'
                            onChange={(e) => setSearchState({ searchValue: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && getSearchDataAndKeys()}
                        />
                        <Icon component={ThinSearchIcon} className='search-icon' />
                    </div>
                    {/* <div className='search-filters-wrapper'>
                        {
                            MAIN_PAGE_FILTER_BUTTONS.map((item, i) =>
                                <Dropdown
                                    key={i}
                                    trigger='click'
                                    menu={{ items: item.children }}
                                    placement="bottomLeft"
                                    overlayStyle={{ padding: '5px 0' }}
                                >
                                    <Button className='outlined-button-white' style={{ borderRadius: 15 }}>
                                        <div className='label' style={{ fontSize: 14 }}>{item.label}</div>
                                    </Button>
                                </Dropdown>
                            )
                        }
                    </div> */}
                </div>
            </div>
            <div className='main-footer'>
                {/* <Image src='/assets/SVG/footer.svg' style={{ objectFit: "contain" }} className='footer-image' /> */}
            </div>
        </div>
    )
}