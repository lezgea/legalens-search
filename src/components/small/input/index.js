import React from 'react'
import { Input } from 'antd'


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