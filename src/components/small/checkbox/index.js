import React from 'react'
import { Checkbox, Popover } from 'antd';


export const CheckBoxItem = (props) => {
    let { id, label, checked, style, hidePopup, onCheck } = props


    return (
        <div className='main-checkbox-wrapper' style={style} onClick={() => onCheck(id, !checked)}>
            <Checkbox checked={checked} onChange={() => onCheck(id, !checked)} />
            {
                hidePopup
                    ?
                    <div className='label'>{label}</div>
                    :
                    <Popover
                        placement="right"
                        content={label}
                        overlayStyle={{ maxWidth: '600px' }}
                    >
                        <div className='label'>{label}</div>
                    </Popover>
            }
        </div>
    )
}