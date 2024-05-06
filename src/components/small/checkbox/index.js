import React from 'react'
import { Checkbox, Popover } from 'antd';


export const CheckBoxItem = (props) => {
    let { id, label, checked, style, onCheck } = props


    return (
        <div className='checkbox-wrapper' style={style} onClick={() => onCheck(id, !checked)}>
            <Checkbox checked={checked} onChange={() => onCheck(id, !checked)} />
            <Popover
                placement="right"
                content={label}
                overlayStyle={{ maxWidth: '600px' }}
            >
                <div className='label'>{label}</div>
            </Popover>
        </div>
    )
}