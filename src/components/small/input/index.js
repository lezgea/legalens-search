import { Input } from 'antd'
import React from 'react'


export const CustomInput = (props) => {
    let { size, placeholder, prefix } = props

    return (
        <Input
            size={size || "large"}
            placeholder="large size"
            prefix={prefix}
            {...props}
        />
    )
}