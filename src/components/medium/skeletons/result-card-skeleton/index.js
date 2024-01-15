import { Checkbox } from 'antd'
import React from 'react'


export const ResultCardSkeleton = () => {
    return (
        <div className='result-card-wrapper'>
            <Checkbox checked={false} onChange={() => { }} />
            <div className='result-card'>
                <div className='date-skeleton' />
                <div className='label-skeleton' />
                <div className='description-skeleton' />
                <div className='linear-filter-wrapper'>
                    <div className='linear-filter-skeleton' />
                </div>
                <div className='text-container'>
                    <div className='text-skeleton' />
                    <div className='text-skeleton' />
                    <div className='text-skeleton' />
                </div>
            </div>
        </div>
    )
}