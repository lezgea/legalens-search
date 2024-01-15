import React from 'react'
import { ResultCardSkeleton } from '../result-card-skeleton'


export const ResultsListSkeleton = () => {
    return (
        <div>
            {
                [...Array(10)].map((item, i) =>
                    <ResultCardSkeleton key={i} />
                )
            }
        </div>
    )
}