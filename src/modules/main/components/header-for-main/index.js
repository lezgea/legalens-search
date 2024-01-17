import React from 'react'
import { Image } from 'antd'
import { useRouter } from 'next/router'


export const HeaderForMain = () => {
    const router = useRouter()

    return (
        <div className='headerformain-wrapper'>
            <Image
                src='/assets/SVG/legalens-logo.svg'
                className='logo'
                preview={false}
                onClick={() => router.push('/')}
            />
        </div>
    )
}

