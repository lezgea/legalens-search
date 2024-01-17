import React from 'react'
import Icon from '@ant-design/icons';


export const OutlinedButton = (props) => {
    let { id, color, label, icon, size, onClick } = props

    return (
        <div className={`outlined-button-${color}`} onClick={onClick} {...props}>
            {!!label && <div className='label'>{label}</div>}
            {!!icon && <Icon component={icon} className='icon' style={{ fontSize: size }} />}
        </div>
    )

}