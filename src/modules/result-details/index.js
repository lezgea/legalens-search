import React from 'react'
import { ArrowRightIcon, DownloadIcon, SearchIcon, SquareIcon, StarIcon } from '@/assets/icons'
import { Header } from '@/components/large'
import { ActionButton } from '@/components/small';
import { useDetails } from '@/hooks/use-details';
import { useRouter } from 'next/router'
import { Input, Modal, Popover } from 'antd';
import { useReactToPrint } from "react-to-print";
import { useSearchContext } from '@/context/search-context';
import { useDetailsKmq } from '@/hooks/use-details-kmq';
import { useDetailsReference } from '@/hooks/use-details-reference';



export default function ResultDetailsModule() {
    const { searchState } = useSearchContext()

    const router = useRouter()
    const { id } = router.query
    const componentRef = React.useRef()
    const searchRef = React.useRef()
    const arrayRef = React.useRef([]);
    const [showSearch, setShowSearch] = React.useState(false)
    const [searchText, setSearchText] = React.useState('');
    const [searchResultCount, setSearchResultCount] = React.useState(0);
    const [highlights, setHighlights] = React.useState([]);
    const [highlightCount, setHighlightCount] = React.useState(0);
    const [currentHighlightIndex, setCurrentHighlightIndex] = React.useState(0);


    let idItems = id.split('_')
    const bolme_id = idItems[0]
    const fesil_id = idItems[1]
    const madde_id = idItems[2]
    const mecelle_id = idItems[3]
    const query = idItems[4]

    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            showRefModal: false,
            hashString: '',
            ref_id: '',
            bolme_id: 0,
            fesil_id: 0,
            madde_id: 0,
            count: 0,
            article: {
                type: 'item',
                index: false,
            }
        }
    )
    const [leftLiner, setLeftLiner] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            data: [],
            step: 0,
        }
    )

    const { data = [], refetch, isFetching } = useDetails({
        mecelle_id,
        bolme_id,
        fesil_id,
        madde_id,
        query,
    }, () => { })


    const { data: kmqData = [], refetch: refetchKmqData, isFetching: isFetchingKmqData } = useDetailsKmq({
        mecelle_id,
    }, () => { })


    const { data: refData = [], refetch: refetchRefData, isFetching: isFetchingRefData } = useDetailsReference({
        mecelle_id,
    }, () => { })


    const onClickDownload = useReactToPrint({
        onBeforePrint: () => document.title = `Məcəllə`,
        content: () => componentRef.current,
    })


    const handleScroll = (event) => {
        const { scrollTop } = event.target
    }

    const [clickPosition, setClickPosition] = React.useState({ x: null, y: null })


    const handleClick = (event) => {
        const { clientX, clientY } = event;
        setClickPosition({ x: clientX, y: clientY });
    }

    const handleInnerSearch = () => {
        if (!!searchText) {
            clearSearchHighlighting()
            const count = highlightAllOccurrences(searchText)
            console.log('@@@@@', count)
            setSearchResultCount(count)
            if (count > 0)
                setShowSearch(true)
        }
    }


    const handleChange = (e) => {
        setSearchText(e.target.value);
        // handleInnerSearch()
    }

    const wrapFoundTextWithClass = (className) => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const span = document.createElement('div');
        span.className = className;
        span.appendChild(range.extractContents());
        range.insertNode(span);
    };


    const clearSearchHighlighting = () => {
        const markedElements = searchRef.current.querySelectorAll('.inner-marked');
        markedElements.forEach(element => {
            element.outerHTML = element.innerHTML;
        });
    };


    const highlightAllOccurrences = (text) => {
        const contentElement = searchRef.current;
        const content = contentElement.innerHTML;
        const regex = new RegExp(`(${text})`, 'gi');

        // Count the number of occurrences of the search term
        const matchCount = (content.match(regex) || []).length;

        const updatedContent = content.replace(regex, '<span class="inner-marked">$1</span>');
        contentElement.innerHTML = updatedContent;

        const allHighlights = contentElement.querySelectorAll('.inner-marked');
        setHighlights(allHighlights);
        setHighlightCount(allHighlights.length);

        if (allHighlights.length > 0) {
            // Scroll to the first highlighted occurrence
            allHighlights[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            setCurrentHighlightIndex(0);
        } else {
            setCurrentHighlightIndex(-1);
        }
        setState({ count: matchCount })
    };

    const scrollToHighlight = (index) => {
        if (highlights.length > 0 && index >= 0 && index < highlights.length) {
            highlights[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            setCurrentHighlightIndex(index);
        }
    };

    const moveToNextHighlight = () => {
        const nextIndex = (currentHighlightIndex + 1) % highlights.length;
        scrollToHighlight(nextIndex);
    };

    const moveToPrevHighlight = () => {
        const prevIndex = (currentHighlightIndex - 1 + highlights.length) % highlights.length;
        scrollToHighlight(prevIndex);
    };

    console.log('@@@@@', state.count)

    function onAddToFavorites() {

    }


    React.useLayoutEffect(() => {
        const handleHashChange = () => {
            const hashString = window.location.hash
            setState({ hashString: hashString })
            window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        }
    }, [])


    React.useEffect(() => {
        if (!!state.hashString) {
            setState({
                referenceText: refData[3][1],
                showRefModal: true,
                hashString: '',
            })
        }
    }, [state.hashString])


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


    React.useEffect(() => {
        if (!!data?.index)
            setState({ article: { type: 'item', index: data.index } })
    }, [data?.index, data])


    React.useEffect(() => {
        if (state.article.index) {
            let indexToScrollTo = state.article.index
            if (arrayRef.current[indexToScrollTo]) {
                if (state.article.type === 'section') {
                    arrayRef.current[indexToScrollTo].scrollIntoView({ behavior: 'smooth' })
                } else {
                    arrayRef.current[indexToScrollTo].scrollIntoView({ behavior: 'smooth', block: 'center' })
                    setTimeout(() => setState({ article: { type: 'section' } }), 7000)
                }
            }
        }
    }, [state.article.index])


    return (
        <div className='uniq-wrapper' onClick={handleClick}>
            <Header />
            <div className='results-details-wrapper'>
                <div className='results-details-left-bar'>
                    <div className='left-liner-filter-wrapper'>
                        <div className='left-liner-filter'>
                            {
                                leftLiner?.data?.map((item, i) => {
                                    let backgroundColor = item[2] || '#000'
                                    let percent = (item[1] * 100)
                                    let marginTop = `${percent}%`

                                    return (
                                        <div
                                            key={i}
                                            className='item'
                                            style={{ top: marginTop }}
                                            onClick={(e) => {
                                                e?.preventDefault();
                                                setState({ article: { type: 'item', index: item[0] } })
                                            }}
                                        >
                                            <div
                                                className='item-marker'
                                                style={{ backgroundColor: backgroundColor }}
                                            >
                                                {
                                                    state.article?.index == item[0] &&
                                                    <div className='item-selected'></div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='item-filters-wrapper'>
                            {
                                data?.bolme_info?.length && data?.bolme_info?.map((item, index) => {
                                    let percent = (item[3] * 100).toString()?.split('.')[0]
                                    let marginTop = `${percent}%`

                                    return (
                                        <div
                                            key={index}
                                            className='item-wrapper'
                                            style={{ top: marginTop }}
                                            onClick={() => setState({ article: { type: 'section', index: item[0] } })
                                            }
                                        >
                                            <div className='line' />
                                            <Popover
                                                placement="right"
                                                content={<div dangerouslySetInnerHTML={{ __html: item[2] }}></div>}
                                                overlayStyle={{ maxWidth: '600px' }}
                                            >
                                                <div className='label' dangerouslySetInnerHTML={{ __html: item[1] }}></div>
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
                        {
                            showSearch
                                ?
                                <div className='inner-search-wrapper'>
                                    {
                                        highlightCount > 0 &&
                                        <div className='highlight-buttons-wrapper'>
                                            <ActionButton
                                                color='blue'
                                                icon={ArrowRightIcon}
                                                className='highlight-left-button'
                                                style={{ height: 30, width: 30, padding: 0, transform: 'rotate(0.5turn)' }}
                                                onClick={moveToPrevHighlight}
                                            />
                                            <div className='highlight-counter'>{currentHighlightIndex + 1}/{highlightCount}</div>
                                            <ActionButton
                                                color='blue'
                                                icon={ArrowRightIcon}
                                                className='highlight-right-button'
                                                style={{ height: 30, width: 30, padding: 0, marginRight: 10 }}
                                                onClick={moveToNextHighlight}
                                            />
                                        </div>
                                    }
                                    <Input
                                        value={searchText}
                                        className='inner-search-input'
                                        placeholder='Axtarış üçün söz və ya söz birləşməsi daxil edin'
                                        onChange={handleChange}
                                        onKeyDown={(e) => e.key === 'Enter' && handleInnerSearch()}
                                    />
                                    <ActionButton color='blue' label='Search' onClick={handleInnerSearch} icon={SearchIcon} />
                                </div>
                                :
                                <ActionButton color='blue' onClick={() => setShowSearch(!showSearch)} icon={SearchIcon} />
                        }
                        <ActionButton color='blue' onClick={() => setState({ showRefModal: true })} icon={SquareIcon} />
                        <ActionButton color='blue' onClick={onClickDownload} icon={DownloadIcon} />
                        {/* <ActionButton color='blue' onClick={onAddToFavorites} icon={StarIcon} label='Seçilmişlərə Əlavə Et' /> */}
                    </div>
                    {
                        isFetching
                            ?
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
                            <div ref={componentRef} className='text-wrapper' >
                                <div ref={searchRef} onScroll={handleScroll}>
                                    {
                                        data?.data?.length && data.data.map((item, index) =>
                                            <div
                                                key={index}
                                                className={(state.article.index === index && state.article.type == 'item') ? 'text-animated' : 'text'}
                                                ref={(element) => arrayRef.current[index] = element}
                                                dangerouslySetInnerHTML={{ __html: item }}
                                            ></div>
                                        )
                                    }
                                </div>
                            </div>
                    }
                </div>

                <div className='results-details-right-bar'>
                    {
                        !!kmqData?.kmqs?.length &&
                        <div className='kmq-card'>
                            <div className='title'>Konstitusiya Məhkəməsinin Qərarları</div>
                            {
                                kmqData?.kmqs?.filter(item => item[0] !== null)?.map((item, i) =>
                                    <Popover
                                        placement="left"
                                        content={
                                            <>
                                                <div dangerouslySetInnerHTML={{ __html: item[0] }} style={{ marginBottom: 10 }}></div>
                                                {
                                                    item[2]?.map((link, i) =>
                                                        <a key={i} href={link}>{link}</a>
                                                    )
                                                }
                                            </>
                                        }
                                        overlayStyle={{ maxWidth: '900px' }}
                                    >
                                        <div
                                            key={i}
                                            className='order-button'
                                            style={{ cursor: !item[3] && 'auto' }}
                                            onClick={async () => {
                                                setState({ article: { type: 'item', index: null } })
                                                setState({ article: { type: 'item', index: item[3] } })
                                                // setTimeout(() => setState({ article: { type: 'item', index: item[3] } }), 1000)
                                            }}
                                        >
                                            <div className='order-label'>{item[1]}</div>
                                        </div>
                                    </Popover>
                                )
                            }
                        </div>
                    }
                    <div className='reference-card' style={{ height: !kmqData?.kmqs?.length && "88vh" }}>
                        <div className='title'>Məcəlləyə edilmiş dəyişiklik və əlavələrin siyahısı</div>
                        {
                            isFetching &&
                            <div className='text-container'>
                                <div className='label-skeleton' />
                                <div className='text-skeleton' style={{ width: '50%' }} />
                            </div>
                        }
                        {
                            refData?.map((item, i) =>
                                <Popover placement="left" content={<div dangerouslySetInnerHTML={{ __html: item[1] }}></div>} overlayStyle={{ maxWidth: '600px' }} >
                                    <div
                                        key={i} className='order-button'
                                        style={{ cursor: !item[2] && 'auto' }}
                                        onClick={() => setState({ article: { type: 'item', index: item[2] } })}
                                    >
                                        <div className='order-link-label truncate-2' dangerouslySetInnerHTML={{ __html: item[1] }}></div>
                                        <div className='order-count'> </div>
                                    </div>
                                </Popover>
                            )
                        }
                    </div>
                </div>

                <Modal
                    width={800}
                    open={state.showRefModal}
                    onOk={() => setState({ showRefModal: false })}
                    onCancel={() => setState({ showRefModal: false })}
                    footer={[]}
                >
                    <div dangerouslySetInnerHTML={{ __html: state.referenceText }}></div>
                </Modal>
            </div>
        </div >
    )
}

