import React from 'react'
import { InfoIcon, SearchIcon } from '@/assets/icons'
import { Header } from '@/components/large'
import { useResultsContext } from '@/context/results-context'
import Icon, { InfoCircleOutlined } from '@ant-design/icons';



const rightBarItems = [
    { label: 'Mənbə məlumatı', values: [{ label: 'Qanunvericilik', icon: null }] },
    { label: 'Müvafiq mətn', values: [{ label: 'Qanunvercilik', icon: SearchIcon }] },
    { label: 'Mövzu xülasələri', values: [{ label: 'Hesabata bax', icon: null }] },
]

const infoItems = [
    { label: 'Diqqət', color: '#FFC107', value: 85 },
    { label: 'Müsbət', color: '#77D47B', value: 144 },
    { label: 'Neytral', color: '#3F51B5', value: 97 },
    { label: 'İstinad edilmiş', color: '#03A9F4', value: 206 },
]


export default function ResultDetailsModule() {
    const { resultsState, selectedResult } = useResultsContext()


    const [leftLiner, setLeftLiner] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
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

        setLeftLiner({
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
                <div className='results-details-left-bar'>
                    <div className='left-liner-filter-wrapper'>
                        <div className='left-liner-filter'>
                            {
                                leftLiner.data.map((item, i) =>
                                    <div key={i} className='item'>
                                        <div className='item-marker' style={{ backgroundColor: item.color }}></div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className='results-details-content'>
                    <div className='label'>{selectedResult?.label}</div>
                    <div className='description'>{selectedResult?.description}</div>
                    <div className='text' dangerouslySetInnerHTML={{ __html: resultText }}></div>
                </div>

                <div className='results-details-right-bar'>
                    <div className='title-wrapper'>
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
                                            <Icon component={val.icon} className='icon' />
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className='label'>Sonrakı apellyasiya şikayəti yoxdur tarix. Əvvəlki tarix mövcuddur.</div>
                    <div className='info-line'>
                        <div className='label'>İstinad Qərarları</div>
                        <div className='info-value'>448</div>
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
                </div>
            </div>
        </div>
    )
}
