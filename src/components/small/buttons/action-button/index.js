import React from 'react'
import Icon from '@ant-design/icons';


export const ActionButton = (props) => {
    let { id, label, icon, size, onClick } = props

    return (
        <div className='action-button' onClick={onClick}>
            <Icon component={icon} className='icon' style={{ fontSize: size }} />
            {!!label && <div className='label'>{label}</div>}
        </div>
    )
}