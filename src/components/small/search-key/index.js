import React from 'react'
import Icon from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons'



export const SearchKey = (props) => {
    let { id, label, color, active, hideClose, onClick } = props


    function onClickKey() {
        onClick()
    }


    return (
        <div
            className='filter-item'
            style={{ color: '#fff', backgroundColor: color }}
        >
            <div className='label'>{label}</div>
            {
                hideClose &&
                <div onClick={onClickKey} className='icon-wrapper'>
                    <CloseOutlined className='icon' />
                    {/* <Icon component={CloseIcon} className='icon' /> */}
                </div>
            }
        </div>
    )
}