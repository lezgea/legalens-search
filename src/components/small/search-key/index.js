import React from 'react'


export const SearchKey = (props) => {
    let { id, label, color, active, onClick } = props

    let bgColor = active ? color : '#CACACA'

    function onClickKey() {
        onClick()
    }


    return (
        <div
            className='filter-item'
            style={{ color: '#fff', backgroundColor: bgColor }}
            onClick={onClickKey}
        >
            <div className='label'>{label}</div>
        </div>
    )
}