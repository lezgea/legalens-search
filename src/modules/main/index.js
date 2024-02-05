import React from 'react'
import Icon from '@ant-design/icons';
import { useRouter } from 'next/router'
import { CircleQuestionIcon, FacebookIcon, InstagramIcon, LinkedinIcon, ThinSearchIcon, TiktokIcon, YoutubeIcon } from '../../assets/icons';
import { useSearchContext } from '@/context/search-context';
import { Button, Dropdown, Input } from 'antd';
import { useResultsContext } from '@/context/results-context';
import { MAIN_PAGE_FILTER_BUTTONS } from '@/constants/initial-states';
import { LeftFixedBar } from './components/left-fixed-bar';
import { Image } from 'antd'
import { useSearch } from '@/hooks/use-search';
import { getSearchData } from '@/api/search/getSearchData';
import { Header } from '@/components/large';



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
        } else {
            setResultsState({ list: [], searchKeys: [] })
            setColors([])
        }
    }, [isFetching])


    async function getSearchDataAndKeys() {
        refetch()
        router.push('/results')
    }


    return (
        <div className='main-wrapper'>
            <Header hideSearch />
            <div className='title-wrapper'>
                <div className='label'>Effektiv Axtarış, Sürətli təhlil, Dəqiq Nəticə</div>
                <div className='description'>Azərbaycanın vahid qanunvericilik bazası əsasında axtarış platforması</div>
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
            <div className='main-footer'>
                <Image
                    src='/assets/SVG/legalens-logo.svg'
                    className='footer-legalens-logo'
                    preview={false}
                    onClick={() => router.push('/')}
                />
                <div className='footer-description'>Platformanın demo versiyasında qanunvericilik bazasında məcəllələrə dair axtarış imkanı təqdim edilir. Tam təminatlı versiya istifadəyə verildikdə, istifadəçilər həmçinin Normativ Hüquqi Aktlar, Beynəlxalq Müqavilələr, Məhkəmə Qərarları, Sərəncamlar, Fərmanlar və Bəyənatlar kimi geniş hüquqi resurslara asanlıqla çıxış əldə edə biləcəklər</div>
                <div className='footer-rights'>2024 | Legalens.ai | All rights reserved</div>
                <div className='footer-bottom'>
                    <div className='footer-icons-wrapper'>
                        {/* <a href='https://www.linkedin.com/company/legalens/' target='_blank'> */}
                        <Icon component={TiktokIcon} className='footer-icon' />
                        {/* </a> */}
                        <a href='https://www.linkedin.com/company/legalens/' target='_blank'>
                            <Icon component={LinkedinIcon} className='footer-icon' />
                        </a>
                        <a href='https://www.facebook.com/profile.php?id=61555927896263&is_tour_dismissed=true' target='_blank'>
                            <Icon component={FacebookIcon} className='footer-icon' />
                        </a>
                        <a href='https://www.instagram.com/legalens.ai/' target='_blank'>
                            <Icon component={InstagramIcon} className='footer-icon' />
                        </a>
                        {/* <a href='https://www.facebook.com/profile.php?id=61555927896263&is_tour_dismissed=true' target='_blank'> */}
                        <Icon component={YoutubeIcon} className='footer-icon' />
                        {/* </a> */}
                    </div>
                    <div className='footer-ai-wrapper'>
                        <div className='footer-ai-text'>Product of</div>
                        <Image
                            src='/assets/SVG/ai-logo.svg'
                            className='footer-ai-logo'
                            preview={false}
                            onClick={() => router.push('/')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}