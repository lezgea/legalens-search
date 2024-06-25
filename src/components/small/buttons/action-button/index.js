import React from 'react'
import Icon from '@ant-design/icons';


export const ActionButton = (props) => {
    let { id, color, label, icon, size, style, labelStyle, onClick } = props

    return (
        <div className={`action-button-${color}`} style={style} onClick={onClick}>
            {!!icon && <Icon component={icon} className='icon' style={{ fontSize: size }} />}
            {!!label && <div className='action-button-label' style={labelStyle}>{label}</div>}
        </div>
    )

}