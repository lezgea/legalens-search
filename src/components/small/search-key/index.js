import React from 'react'
import { CloseOutlined } from '@ant-design/icons'



export const SearchKey = (props) => {
    let { id, label, color, showClose, onClick } = props


    function onClickKey() {
        onClick()
    }


    return (
        <div
            className='filter-item'
            style={{ color: '#fff', backgroundColor: color, padding: !showClose && '9px 15px' }}
        >
            <div className='label'>{label}</div>
            {
                showClose &&
                <div onClick={onClickKey} className='icon-wrapper'>
                    <CloseOutlined className='icon' />
                </div>
            }
        </div>
    )
}