import React from 'react'


export const SearchKey = (props) => {
    let { id, label, color, onClick } = props

    function onClickKey() {
        onClick()
    }


    return (
        <div className='filter-item' style={{ color: '#fff', backgroundColor: color || '#dedede' }} onClick={onClickKey}>
            <div className='label'>{label}</div>
        </div>
    )
}