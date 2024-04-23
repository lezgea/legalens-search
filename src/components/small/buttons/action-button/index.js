import React from 'react'
import Icon from '@ant-design/icons';
// import classNames


export const ActionButton = (props) => {
    let { id, color, label, icon, size, style, onClick } = props

    return (
        <div className={`action-button-${color}`} style={style} onClick={onClick}>
            {!!icon && <Icon component={icon} className='icon' style={{ fontSize: size }} />}
            {!!label && <div className='label'>{label}</div>}
        </div>
    )

}