import { Header } from '@/components/large'
import { useResultsContext } from '@/context/results-context'
import React from 'react'


export default function ResultDetailsModule() {
    const { resultsState, selectedResult } = useResultsContext()


    const [linerData, setLinerData] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            data: [],
            step: 0,
        }
    )

    const resultText = selectedResult.text


    function countWordOccurrences() {
        const words = resultText?.toLowerCase().match(/\b\w+\b/g)
        let data = []
        let step = 0
        let wordsCount = 0
        let keys = resultsState.searchKeys.map(item => item.label)

        if (words) {
            words.forEach((word, index) => {
                wordsCount += 1
                let wordExist = keys.includes(word)
                if (wordExist) {
                    data.push(resultsState.searchKeys.find(item => item.label === word))
                } else {
                    data.push({ id: index, color: 'transparent' })
                }
            })
        }
        step = wordsCount / 100

        setLinerData({
            data: data,
            step: step,
        })
    }


    React.useEffect(() => {
        countWordOccurrences()
    }, [resultsState.searchKeys])



    return (
        <div className='uniq-wrapper'>
            <Header />
            <div className='results-details-wrapper'>
                {/* <div style={{ width: 300, backgroundColor: 'red' }}>skdsjkfsdfs</div> */}
                <div className='results-details-left-bar'>
                    CONTENT
                </div>
                <div className='results-details-content'>
                    <div className='label'>{selectedResult?.label}</div>
                    <div className='description'>{selectedResult?.description}</div>
                    <div className='text' dangerouslySetInnerHTML={{ __html: resultText }}></div>
                </div>
                <div className='results-details-right-bar'>
                    CONTENT
                </div>
                {/* <div className='results-content-wrapper'>

                </div> */}
                {/* <SideFilterBar />
                <div className='results-content-wrapper'>
                    <div className='list-filters-fixed'>
                        <div className='filter-items-wrapper'>
                            {resultsState.searchKeys.map(item => <SearchKey key={item.id} {...item} />)}
                        </div>
                        <div className='action-buttons-wrapper'>
                            {topRightActions.map(item => <ActionButton key={item.id} color='gray' {...item} />)}
                        </div>
                    </div>
                    <div className='results-list-wrapper'>
                        <div className='list-header-wrapper'>
                            <Checkbox checked={false} onChange={() => { }} />
                            <div className='list-header'>
                                <div className='action-buttons-wrapper'>
                                    {bottomLeftActions.map(item => <ActionButton key={item.id} color='white' {...item} />)}
                                </div>
                                <div className='action-buttons-wrapper'>
                                    {bottomRightActions.map(item => <ActionButton key={item.id} color='white' {...item} />)}
                                </div>
                            </div>
                        </div>
                        {
                            resultsState?.list?.map(item =>
                                <ResultCard
                                    {...item}
                                    key={item.id}
                                    text={getMarkedText(item.text)}
                                />
                            )
                        }
                        {
                            !resultsState?.list?.length &&
                            <div className='empty-content'>
                                <Empty description={'No Results'} />
                            </div>
                        }
                    </div>
                </div> */}
            </div>
        </div>
    )
}
