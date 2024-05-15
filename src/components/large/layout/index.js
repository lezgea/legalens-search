import React from 'react'
import { LayoutIcon } from '@/assets/icons';
import { Image } from 'antd';


export const Layout = ({ children }) => {

    return (
        <div className='layout-wrapper'>
            <Image src={LayoutIcon} className='layout-icon' preview={false} />
            <div className='uniq-wrapper'>
                {children}
            </div>
        </div>
    )
}