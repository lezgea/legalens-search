import React, { useEffect } from 'react'
import { ArrowDownIcon, DownloadBoldIcon, DownloadIcon, InfoIcon, LinkIcon, SearchIcon, SquareIcon } from '@/assets/icons'
import { Header } from '@/components/large'
import { useResultsContext } from '@/context/results-context'
import Icon from '@ant-design/icons';
import { ActionButton } from '@/components/small';
import { OutlinedButton } from '@/components/small/buttons/outlined-button';
import { useDetails } from '@/hooks/use-details';
import { useRouter } from 'next/router'
import { Divider, Popover } from 'antd';
import { useReactToPrint } from "react-to-print";
import { useDetailsIndex } from '@/hooks/use-details-index';
import { useDetailsReference } from '@/hooks/use-details-reference';



const rightBarItems = [
    { label: 'Mənbə məlumatı', values: [{ label: 'Qanunvericilik', icon: null }] },
    { label: 'Müvafiq mətn', values: [{ label: 'Qanunvercilik', icon: SearchIcon }] },
    { label: 'Mövzu xülasələri', values: [{ label: 'Hesabata bax', icon: null }] },
]

const infoItems = [
    { label: 'Diqqət', color: '#FFC107', value: 250 },
    { label: 'Müsbət', color: '#77D47B', value: 144 },
    { label: 'Neytral', color: '#3F51B5', value: 97 },
    { label: 'İstinad edilmiş', color: '#03A9F4', value: 206 },
]


export default function ResultDetailsModule() {
    const { resultsState, selectedResult, colors } = useResultsContext()

    const router = useRouter()
    const { id } = router.query
    const componentRef = React.useRef()
    const arrayRef = React.useRef([]);

    let idItems = id.split('_')
    const bolme_id = idItems[0]
    const fesil_id = idItems[1]
    const madde_id = idItems[2]

    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            ref_id: '',
            bolme_id: 0,
            fesil_id: 0,
            madde_id: 0,
        }
    )
    const [leftLiner, setLeftLiner] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            data: [],
            step: 0,
        }
    )
    const [articleIndex, setArticleIndex] = React.useState(0);


    const { data = [], refetch, isFetching } = useDetails({
        mecelle_id: '0',
        bolme_id,
        fesil_id,
        madde_id,
    }, () => { })


    const { data: indexData = [], refetch: refetchIndexData, isFetching: isFetchingIndexData } = useDetailsIndex({
        mecelle_id: '0',
        bolme_id: state.bolme_id,
        fesil_id: state.fesil_id,
        madde_id: state.madde_id,
    }, () => { })

    const { data: referenceData, refetch: refetchReferenceData, isFetching: isFetchingReferenceData } = useDetailsReference({
        mecelle_id: '0',
        ref_name: state.ref_id,
        qtype: 'ref',
    }, () => { })



    const onClickDownload = useReactToPrint({
        onBeforePrint: () => document.title = `Məcəllə`,
        content: () => componentRef.current,
    })


    React.useEffect(() => {
        refetch()
        setState({
            bolme_id: bolme_id,
            fesil_id: fesil_id,
            madde_id: madde_id,
        })
    }, [])


    React.useEffect(() => {
        if (!!data.percentages?.length) {
            setLeftLiner({
                data: [...data?.percentages],
            })
        }
    }, [data.percentages])


    React.useEffect(() => {
        if (indexData.index) {
            setArticleIndex(indexData.index)
        }
    }, [indexData.index])


    React.useLayoutEffect(() => {
        let indexToScrollTo = articleIndex; // Change this to the index you want to scroll to
        if (arrayRef.current[indexToScrollTo]) {
            if (articleIndex == indexData.index) {
                arrayRef.current[indexToScrollTo].scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                arrayRef.current[indexToScrollTo].scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [articleIndex])



    return (
        <div className='uniq-wrapper'>
            <Header />
            <div className='results-details-wrapper'>
                <div className='results-details-left-bar'>
                    {/* <div className='header-btns-wrapper'>
                        <OutlinedButton color='white' label='Axtarış şərtləri' icon={ArrowDownIcon} />
                        <OutlinedButton color='white' icon={ArrowDownIcon} />
                        <OutlinedButton color='white' icon={ArrowDownIcon} />
                    </div> */}

                    <div className='left-liner-filter-wrapper'>
                        <div className='left-liner-filter'>
                            {
                                leftLiner?.data?.map((item, i) => {
                                    let backgroundColor = colors[item[1]]
                                    let percent = (item[3] * 100).toString()?.split('.')[0]
                                    let marginTop = `${percent}%`
                                    let splittedId = item[2].split('.')
                                    let bolmeId = splittedId[1]
                                    let fesilId = splittedId[2]
                                    let maddeId = splittedId[3]

                                    return (
                                        <div
                                            key={i}
                                            className='item'
                                            style={{ top: marginTop }}
                                            onClick={(e) => {
                                                e?.preventDefault();
                                                setState({
                                                    bolme_id: bolmeId,
                                                    fesil_id: fesilId,
                                                    madde_id: maddeId,
                                                })
                                            }}
                                        >
                                            <div className='item-marker' style={{ backgroundColor: backgroundColor }}></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='item-filters-wrapper'>
                            {
                                data?.bolme_info?.length && data?.bolme_info?.map((item, index) => {
                                    let percent = (item[2] * 100).toString()?.split('.')[0]
                                    let marginTop = `${percent}%`

                                    return (
                                        <div
                                            key={index}
                                            className='item-wrapper'
                                            style={{ top: marginTop }}
                                            onClick={() => setArticleIndex(item[0] - 4)}
                                        >
                                            <div className='line' />
                                            <Popover
                                                placement="right"
                                                content={<div dangerouslySetInnerHTML={{ __html: item[1][0] }}></div>}
                                                overlayStyle={{ maxWidth: '600px' }}
                                            >
                                                <div className='label'>{`Bölmə ${index + 1}`}</div>
                                            </Popover>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='results-details-content'>
                    <div className='header-icons-wrapper'>
                        <ActionButton color='blue' onClick={() => { }} icon={SearchIcon} />
                        <ActionButton color='blue' onClick={() => { }} icon={SquareIcon} />
                        <ActionButton color='blue' onClick={onClickDownload} icon={DownloadIcon} />
                    </div>
                    {
                        isFetching
                            ?
                            // text skeleton which appears while fetching
                            <div className='text-wrapper'>
                                <div className='text-container'>
                                    <div className='label-skeleton' />
                                    <div className='text-skeleton' style={{ width: '50%' }} />
                                    <div className='text-skeleton' style={{ width: '70%' }} />
                                    <div className='text-skeleton' style={{ width: '20%' }} />
                                    {
                                        [...Array(100)].map((item, i) =>
                                            <div key={i} className='text-skeleton' />
                                        )
                                    }
                                </div>
                            </div>
                            :
                            <div className='text-wrapper' ref={componentRef}>
                                {
                                    data?.data?.length && data.data.map((item, index) =>
                                        <div
                                            key={index}
                                            className={indexData.index === index ? 'text-animated' : 'text'}
                                            ref={(element) => arrayRef.current[index] = element}
                                            dangerouslySetInnerHTML={{ __html: item[0] }}
                                        ></div>
                                    )
                                }
                            </div>
                    }
                </div>

                <div className='results-details-right-bar'>
                    {/* <div className='card'>
                        <div className='title'>Related</div>
                        <div className='order-button'>
                            <div className='order-link-label'>Qanunvericilik</div>
                            <Icon className='order-icon' component={LinkIcon} />
                        </div>
                        <div className='order-button'>
                            <div className='order-link-label'>Rekvizit</div>
                            <div className='order-buttons-wrapper'>
                                <OrderButton type='pdf' />
                                <OrderButton type='doc' />
                                <OrderButton type='txt' />
                            </div>
                        </div>
                    </div> */}
                    <div className='card'>
                        <div className='title'>Konstitusiya Məhkəməsinin Qərarları</div>
                        <div className='order-button'>
                            <div className='order-label'>KMQ 1</div>
                            <div className='order-count'>134/343</div>
                        </div>
                        <div className='order-button'>
                            <div className='order-label'>KMQ 1</div>
                            <div className='order-count'>134/343</div>
                        </div>
                        <div className='order-button'>
                            <div className='order-label'>KMQ 1</div>
                            <div className='order-count'>134/343</div>
                        </div>
                    </div>
                    <div className='card' style={{ height: '90%', overflow: 'auto' }}>
                        <div className='title'>Məcəlləyə edilmiş dəyişiklik və əlavələrin siyahısı</div>
                        {
                            isFetching &&
                            <div className='text-container'>
                                <div className='label-skeleton' />
                                <div className='text-skeleton' style={{ width: '50%' }} />
                            </div>
                        }
                        {
                            data.references?.map((item, i) =>
                                <Popover placement="left" content={item[1]} overlayStyle={{ maxWidth: '600px' }} >
                                    <div key={i} className='order-button' onClick={() => setState({ ref_id: item[2] })}>
                                        <div className='order-link-label truncate-2'>{item[1]}</div>
                                        <div className='order-count'> </div>
                                    </div>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

