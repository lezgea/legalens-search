import React from 'react'
import { Image } from 'antd'
import { useRouter } from 'next/router';
import Link from 'next/link';


export const MainHeader = (props) => {
    let { } = props
    const router = useRouter()

    return (
        <div className='header-wrapper'>
            <Image
                src='/assets/SVG/legalens-logo.svg'
                className='logo'
                preview={false}
                onClick={() => router.push('/')}
            />

            <div className='auth-buttons-wrapper'>
                <Link className='registration-button' href="/sign-up">Qeydiyyat</Link>
                <Link className='login-button' href="/sign-in">Giriş et</Link>
            </div>
            {/* <div className='profile-wrapper'>
                <div className='notification-wrapper'>
                    <Icon component={NotificationIcon} className='icon' />
                    <div className='count-circle'>
                        <div className='text'>3</div>
                    </div>
                </div>
                <Avatar src={'/assets/PNG/wow-cat.png'} size={45} />
            </div> */}
        </div >
    )
}
