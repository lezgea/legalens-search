import React from 'react'


export const SearchKey = (props) => {
    let { id, label, color } = props

    return (
        <div className='filter-item' style={{ color: '#fff', backgroundColor: color || '#dedede' }}>
            <div className='label'>{label}</div>
        </div>
    )
}