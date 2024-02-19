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

    let idItems = id.split('_')
    const bolme_id = idItems[0]
    const fesil_id = idItems[1]
    const madde_id = idItems[2]

    // const selectedDivRef = React.useRef()
    const [articleIndex, setArticleIndex] = React.useState(0);
    const arrayRef = React.useRef([]);

    const { data = [], refetch, isFetching } = useDetails({
        mecelle_id: '1',
        bolme_id,
        fesil_id,
        madde_id,
    }, () => { })

    const [leftLiner, setLeftLiner] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            data: [],
            step: 0,
        }
    )

    // we use this variable for calculating color lines widths in the right bar
    let totalInfoLinesValue = infoItems.reduce((acc, item) => acc + item.value, 0)
    const resultText = selectedResult.text


    // counts words by searchkeys for leftside vertical liner 
    function countWordOccurrences() {
        const words = resultText?.toLowerCase().match(/\b\w+\b/g)
        let data = []
        let step = 0
        let wordsCount = 0
        let keys = resultsState.searchKeys.map(item => item.label)

        if (words)
            words.forEach((word, index) => {
                wordsCount += 1
                let wordExist = keys.includes(word)
                if (wordExist) {
                    data.push(resultsState.searchKeys.find(item => item.label === word))
                } else {
                    data.push({ id: index, color: 'transparent' })
                }
            })
        step = wordsCount / 100
        setLeftLiner({ data: data, step: step })
    }


    React.useEffect(() => {
        if (!!data.percentages?.length) {
            setLeftLiner({
                data: [...data?.percentages],
                // text: text,
            })
        }
    }, [data.percentages])


    React.useEffect(() => {
        let indexToScrollTo = articleIndex; // Change this to the index you want to scroll to
        if (arrayRef.current[indexToScrollTo]) {
            arrayRef.current[indexToScrollTo].scrollIntoView({ behavior: 'smooth' });
        }
    }, [articleIndex])


    React.useEffect(() => {
        refetch()
    }, [])


    React.useLayoutEffect(() => {
        if (typeof data?.data != "undefined" && !isFetching && data.madde_id) {
            let indexToScrollTo = data.bolme_id; // Change this to the index you want to scroll to
            if (arrayRef.current[indexToScrollTo]) {
                arrayRef.current[indexToScrollTo].scrollIntoView({ behavior: 'smooth' });
                let newIndexToScrollTo = data.madde_id;
                // if (newIndexToScrollTo) {
                // arrayRef.current[newIndexToScrollTo].scrollIntoView({ behavior: 'smooth' });
                // }
            }
        }

    }, [isFetching, data.data, data.madde_id]);

    // React.useLayoutEffect(() => {
    //     if (typeof data?.data != "undefined" && !isFetching) {
    //         selectedDivRef?.current?.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, [isFetching, data.data])

    console.log('@@@@', data)


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
                                    let marginTop = `${percent}vh`

                                    return (
                                        <div
                                            key={i}
                                            className='item'
                                            style={{ marginTop: marginTop }}
                                        // onClick={(e) => { e?.preventDefault(); onSelectCrop(item[3]) }}
                                        >
                                            <div className='item-marker' style={{ backgroundColor: backgroundColor }}></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='item-filters-wrapper'>
                            {
                                typeof data?.data != "undefined" &&
                                !!Object.values(data?.data)?.length &&
                                Object.values(data?.data).map((bolme, bolmeIndex) =>
                                    <div key={bolmeIndex} className='item-wrapper' onClick={() => setArticleIndex(bolmeIndex)}>
                                        <div className='line' />
                                        <div className='label'>{`Bölmə ${bolmeIndex + 1}`}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className='results-details-content'>
                    <div className='header-icons-wrapper'>
                        <ActionButton color='blue' onClick={() => { }} icon={SearchIcon} />
                        <ActionButton color='blue' onClick={() => { }} icon={SquareIcon} />
                        <ActionButton color='blue' onClick={() => { }} icon={DownloadIcon} />
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
                            <div className='text-wrapper'>
                                {
                                    typeof data?.data != "undefined" &&
                                    !!Object.values(data?.data)?.length &&
                                    Object.values(data?.data).map((bolme, bolmeIndex) =>
                                        <div key={bolmeIndex} ref={(element) => arrayRef.current[bolmeIndex] = element}>
                                            {
                                                bolme.map((madde, maddeIndex) => {
                                                    // if (data.bolme_id === bolmeIndex)
                                                    return (
                                                        <div
                                                            key={maddeIndex}
                                                            className='text'
                                                            // ref={(element) => arrayRef.current[maddeIndex] = element}
                                                            dangerouslySetInnerHTML={{ __html: madde[0] }}
                                                        ></div>
                                                    )

                                                    return (
                                                        <div
                                                            key={maddeIndex}
                                                            className='text'
                                                            // ref={(element) => arrayRef.current[index] = element}
                                                            dangerouslySetInnerHTML={{ __html: madde[0] }}
                                                        ></div>
                                                    )
                                                }

                                                )
                                            }
                                        </div>
                                    )
                                }
                                {/* <div className='text' dangerouslySetInnerHTML={{ __html: data.before_obj }}></div> */}
                                {/* <div className='text' ref={selectedDivRef} dangerouslySetInnerHTML={{ __html: data.current_obj }}></div> */}
                                {/* <div className='text' dangerouslySetInnerHTML={{ __html: data.after_obj }}></div> */}
                            </div>
                    }
                </div>

                <div className='results-details-right-bar'>
                    <div className='card'>
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
                    </div>
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
                    <div className='card'>
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
                                <Popover placement="left" content={item[2]} overlayStyle={{ maxWidth: '600px' }} >
                                    <div key={i} className='order-button'>
                                        <div className='order-link-label truncate-2'>{item[2]}</div>
                                        <div className='order-count'> </div>
                                    </div>
                                </Popover>
                            )
                        }
                    </div>

                    {/* <div className='title-wrapper'>
                        <div className='icon-wrapper'>
                            <InfoCircleOutlined className='icon' />
                        </div>
                        <div className='title'>Məlumat</div>
                    </div>
                    {
                        rightBarItems.map((item, i) =>
                            <div key={i}>
                                <div className='label'>{item.label}</div>
                                {
                                    item.values?.map((val, j) =>
                                        <div key={j} className='value-box'>
                                            <div className='value'>{val.label}</div>
                                            {
                                                val.icon &&
                                                <Icon component={val.icon} className='icon' />
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className='label'>Sonrakı apellyasiya şikayəti yoxdur tarix. Əvvəlki tarix mövcuddur.</div>

                    <div className='bottom-wrapper'>
                        <div className='info-line'>
                            <div className='label'>İstinad Qərarları</div>
                            <div className='info-value'>448</div>
                        </div>
                        <div className='lines-wrapper'>
                            {
                                infoItems.reverse().map((item, i) =>
                                    <div
                                        key={i}
                                        className='line'
                                        style={{
                                            zIndex: 5 - i,
                                            width: (totalInfoLinesValue / 100) * item.value + 20,
                                            background: item.color,
                                        }}
                                    />
                                )
                            }
                        </div>
                        {
                            infoItems.map((item, i) =>
                                <div key={i} className='info-line'>
                                    <div className='circle-line-wrapper'>
                                        <div className='circle' style={{ backgroundColor: item.color }}></div>
                                        <div className='label'>{item.label}</div>
                                    </div>
                                    <div className='info-value'>{item.value}</div>
                                </div>
                            )
                        }
                    </div> */}
                </div>
            </div>
        </div >
    )
}



const OrderButton = ({ type, action }) => {
    let TYPES = {
        pdf: { title: 'PDF', color: '#D96B6B', backgroundColor: '#FFD3D3', },
        doc: { title: 'DOC', color: '#426DAE', backgroundColor: '#B2DAFF', },
        txt: { title: 'TXT', color: '#4D5E76', backgroundColor: '#E5E5E5', },
    }

    return (
        <div className={`${type}-button`} onClick={action}>
            <div className='label' >{TYPES[type].title}</div>
            <Icon component={DownloadBoldIcon} className='icon' />
        </div>
    )
}
