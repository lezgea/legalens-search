import React from 'react'
import Icon from '@ant-design/icons';
import { useRouter } from 'next/router'
import { FacebookIcon, InstagramIcon, LinkedinIcon, ThinSearchIcon } from '../../assets/icons';
import { useSearchContext } from '@/context/search-context';
import { Input } from 'antd';
import { useResultsContext } from '@/context/results-context';
import { Image } from 'antd'
import { useSearch } from '@/hooks/use-search';
import { MainHeader } from '@/components/large';
import { v4 as uuidv4 } from 'uuid';
import { useSearchHistoryMutation } from '@/hooks/use-search-history';



export default function FavoritesModule() {
    const { searchState, setSearchState } = useSearchContext()
    const { setResultsState, setColors } = useResultsContext()
    const router = useRouter()

    const { data = [], refetch, isFetching } = useSearch({ query: searchState.searchValue, offset: searchState.offset }, () => { })
    const { mutate: postSearchHistory, isSuccess, isLoading: postSearchHistoryLoading } = useSearchHistoryMutation()


    const getDeviceID = () => {
        let deviceID = localStorage.getItem('deviceID')
        if (!deviceID) {
            deviceID = uuidv4()
            localStorage.setItem('deviceID', deviceID)
        }
        return deviceID
    }


    const getSourceID = () => {
        let legalSourceID = localStorage.getItem('legalSourceID')
        if (!legalSourceID) {
            legalSourceID = router?.query?.s
            localStorage.setItem('legalSourceID', legalSourceID)
        }
        return legalSourceID
    }


    const getCompanyID = () => {
        let legalCompanyID = localStorage.getItem('legalCompanyID')
        if (!legalCompanyID) {
            legalCompanyID = router?.query?.c
            localStorage.setItem('legalCompanyID', legalCompanyID)
        }
        return legalCompanyID
    }


    const deviceID = getDeviceID()
    const legalSourceID = getSourceID()
    const legalCompanyID = getCompanyID()


    function updateResultsState() {
        setResultsState({ loading: isFetching })
        if (!!data?.length) {
            setResultsState({ list: data[0], searchKeys: data[1] })
            setColors([...Object.values(data[2])])
        } else {
            setResultsState({ list: [], searchKeys: [] })
            setColors([])
        }
    }

    async function getSearchDataAndKeys() {
        postSearchHistory({
            search: searchState.searchValue,
            uniqueId: deviceID,
            source: legalSourceID,
            campaignId: legalCompanyID,
        })
        refetch()
        router.push('/results')
    }


    React.useEffect(() => {
        updateResultsState()
    }, [data[1]])


    return (
        <div className='main-wrapper'>
            <MainHeader />
            <div className='content-wrapper'>

            </div>
            <div className='footer-bottom'>
                <div className='footer-icons-wrapper'>
                    {/* <a href='https://www.linkedin.com/company/legalens/' target='_blank'> */}
                    {/* <Icon component={TiktokIcon} className='footer-icon' /> */}
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
                    {/* <Icon component={YoutubeIcon} className='footer-icon' /> */}
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
    )
}