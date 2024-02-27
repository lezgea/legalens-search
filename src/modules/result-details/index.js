import React, { useEffect } from 'react'
import { ArrowDownIcon, DownloadBoldIcon, DownloadIcon, InfoIcon, LinkIcon, SearchIcon, SquareIcon } from '@/assets/icons'
import { Header } from '@/components/large'
import { useResultsContext } from '@/context/results-context'
import Icon from '@ant-design/icons';
import { ActionButton } from '@/components/small';
import { useDetails } from '@/hooks/use-details';
import { useRouter } from 'next/router'
import { Divider, Modal, Popover } from 'antd';
import { useReactToPrint } from "react-to-print";
import { useDetailsIndex } from '@/hooks/use-details-index';
import { useDetailsReference } from '@/hooks/use-details-reference';
import { useSearchContext } from '@/context/search-context';



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
    const { searchState } = useSearchContext()

    const router = useRouter()
    const { id } = router.query
    const componentRef = React.useRef()
    const arrayRef = React.useRef([]);

    let idItems = id.split('_')
    const bolme_id = idItems[0]
    const fesil_id = idItems[1]
    const madde_id = idItems[2]
    const mecelle_id = idItems[3]
    const ref_id = router.asPath.split('#')[1]

    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            showRefModal: false,
            hashString: '',
            ref_id: '',
            bolme_id: 0,
            fesil_id: 0,
            madde_id: 0,
            article: {
                type: 'item',
                index: false,
            }
        }
    )
    const [reference, setReference] = React.useState('')
    const [leftLiner, setLeftLiner] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            data: [],
            step: 0,
        }
    )
    // articleIndex
    // const [article, setArticle] = React.useState();


    const { data = [], refetch, isFetching } = useDetails({
        mecelle_id,
        bolme_id,
        fesil_id,
        madde_id,
        query: searchState?.searchValue,
    }, () => { })


    const { data: indexData = [], refetch: refetchIndexData, isFetching: isFetchingIndexData } = useDetailsIndex({
        mecelle_id,
        bolme_id: state.bolme_id,
        fesil_id: state.fesil_id,
        madde_id: state.madde_id,
    }, () => { })

    const { data: referenceData = [], refetch: refetchReferenceData, isFetching: isFetchingReferenceData } = useDetailsReference({
        mecelle_id,
        ref_name: state.ref_id,
        qtype: 'ref',
    }, () => { })

    const { data: kmqData = [], refetch: refetchKmqData, isFetching: isFetchingKmqData } = useDetailsReference({
        mecelle_id,
        ref_name: state.ref_id,
        qtype: 'kmq',
    }, () => { })



    const onClickDownload = useReactToPrint({
        onBeforePrint: () => document.title = `Məcəllə`,
        content: () => componentRef.current,
    })


    React.useEffect(() => {
        refetch()
    }, [])


    React.useEffect(() => {
        if (!!data.percentages?.length) {
            setLeftLiner({
                data: [...data?.percentages],
            })
        }
    }, [data.percentages])


    React.useLayoutEffect(() => {
        if (!!data?.index)
            setState({ article: { type: 'item', index: data.index } })
        if (!!indexData?.index)
            setState({ article: { type: 'item', index: indexData.index } })
        if (!!referenceData?.index)
            setState({ article: { type: 'item', index: referenceData.index } })
    }, [indexData?.index, referenceData?.index, data?.index, data])


    React.useLayoutEffect(() => {
        if (state.article.index) {
            let indexToScrollTo = state.article.index; // Change this to the index you want to scroll to
            if (arrayRef.current[indexToScrollTo]) {
                if (state.article.type === 'section') {
                    arrayRef.current[indexToScrollTo].scrollIntoView({ behavior: 'smooth' });
                } else {
                    arrayRef.current[indexToScrollTo].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    }, [state.article.index])


    const handleScroll = (event) => {
        const { scrollTop } = event.target;
        // if (box2Ref.current) {
        //     box2Ref.current.scrollTop = scrollTop;
        // }
    };

    const [clickPosition, setClickPosition] = React.useState({ x: null, y: null });

    const handleClick = (event) => {
        const { clientX, clientY } = event;
        setClickPosition({ x: clientX, y: clientY });
    };


    React.useEffect(() => {
        const handleHashChange = () => {
            const hashString = window.location.hash
            setState({ hashString: hashString })
            window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
            // const params = new URLSearchParams(hashString);
            // const id = params.get('id');
            // console.log('ID:', id);
            // Do something with the ID
        }
        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        }
    }, [])



    React.useEffect(() => {
        if (!!state.hashString) {
            let selectedReference = data?.references?.find(item =>
                item[2] === state.hashString.split('#')[1]
            )
            setState({
                referenceText: selectedReference[1],
                showRefModal: true,
                hashString: '',
            })
        }
    }, [state.hashString])


    return (
        <div className='uniq-wrapper' onClick={handleClick}>
            <Header />
            <div className='results-details-wrapper'>
                <div className='results-details-left-bar'>
                    <div className='left-liner-filter-wrapper'>
                        <div className='left-liner-filter'>
                            {
                                leftLiner?.data?.map((item, i) => {
                                    let backgroundColor = !!data?.colors?.length && data?.colors[item[0][0]] || '#000'
                                    let percent = (item[0][2] * 100).toString()?.split('.')[0]
                                    let marginTop = `${percent}%`

                                    return (
                                        <div
                                            key={i}
                                            className='item'
                                            style={{ top: marginTop }}
                                            onClick={(e) => {
                                                e?.preventDefault();
                                                setState({ article: { type: 'item', index: item[1] } })
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
                                            onClick={() => setState({ article: { type: 'section', index: item[0] - 4 } })
                                            }
                                        >
                                            <div className='line' />
                                            <Popover
                                                placement="right"
                                                content={<div dangerouslySetInnerHTML={{ __html: item[1] }}></div>}
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
                    {/* <div className='article-label-wrapper'>
                        <div className='article-label'>{data.mecelle_name}</div>
                    </div> */}
                    <div className='header-icons-wrapper'>
                        <ActionButton color='blue' onClick={() => { }} icon={SearchIcon} />
                        <ActionButton color='blue' onClick={() => setState({ showRefModal: true })} icon={SquareIcon} />
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
                            <div className='text-wrapper' ref={componentRef} onScroll={handleScroll}>
                                {
                                    data?.data?.length && data.data.map((item, index) =>
                                        <div
                                            key={index}
                                            className={(state.article.index === index && state.article.type == 'item') ? 'text-animated' : 'text'}
                                            ref={(element) => arrayRef.current[index] = element}
                                            dangerouslySetInnerHTML={{ __html: item[0] }}
                                        ></div>
                                    )
                                }
                                {
                                    // data?.data?.length && data.elave
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
                    {
                        !!data.kmqs?.length &&
                        <div className='kmq-card'>
                            <div className='title'>Konstitusiya Məhkəməsinin Qərarları</div>
                            {
                                data.kmqs?.filter(item => item[0] !== null)?.map((item, i) =>
                                    <Popover placement="left" content={item[0]} overlayStyle={{ maxWidth: '900px' }} >
                                        <div key={i} className='order-button' onClick={() => setState({ article: { type: 'item', index: item[3] } })}>
                                            <div className='order-label'>{item[1]}</div>
                                            <div className='order-count'>{item[3]}/{data?.data?.length}</div>
                                        </div>
                                    </Popover>
                                )
                            }
                        </div>
                    }
                    <div className='reference-card' style={{ height: !data.kmqs?.length && "88vh" }}>
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
                                    <div key={i} className='order-button' onClick={() => setState({ article: { type: 'item', index: item[4] } })}>
                                        <div className='order-link-label truncate-2'>{item[1]}</div>
                                        <div className='order-count'> </div>
                                    </div>
                                </Popover>
                            )
                        }
                    </div>
                </div>


                <Modal
                    width={800}
                    // title="Edit Item"
                    open={state.showRefModal}
                    onOk={() => setState({ showRefModal: false })}
                    onCancel={() => setState({ showRefModal: false })}
                    footer={[

                    ]}
                >
                    {
                        state.referenceText
                        // !!data?.references?.length &&
                        // <div>
                        //     {/* kldsklfslksdlkksdfkslkfsdklflksdlkf */}
                        //     {data?.references[1]}
                        // </div>
                    }
                </Modal>
            </div>
        </div >
    )
}

