import React from 'react'
import Icon from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons'



export const SearchKey = (props) => {
    let { id, label, color, active, showClose, onClick } = props


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
                    {/* <Icon component={CloseIcon} className='icon' /> */}
                </div>
            }
        </div>
    )
}