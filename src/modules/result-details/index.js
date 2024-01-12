import { Header } from '@/components/large'
import React from 'react'


export default function ResultDetailsModule() {
    return (
        <div className='uniq-wrapper'>
            <Header />
            <div className='results-inner-wrapper'>
                {/* <div style={{ width: 300, backgroundColor: 'red' }}>skdsjkfsdfs</div> */}
                <div className='results-details-content'>
                    CONTENT
                </div>
                <div className='results-details-content'>
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
