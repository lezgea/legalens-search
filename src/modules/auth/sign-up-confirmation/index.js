import React from 'react'
import { Image, Button } from "antd";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CheckCircleFilled } from '@ant-design/icons';


export default function SignUpConfirmationModule() {
    const router = useRouter()


    function onClickSignIn() {
        router.push('/sign-in')
    }


    return (
        <div className='sign-in-container'>
            <div className='sign-in-wrapper'>
                <Link href='/' className='logo-wrapper'>
                    <Image
                        src='/assets/SVG/legalens-logo.svg'
                        className='logo'
                        preview={false}
                        onClick={() => router.push('/')}
                    />
                </Link>
                <div className='sign-in-card' style={{ width: '40%', alignItems: 'center' }}>
                    <CheckCircleFilled className='success-icon' />
                    <div className='welcome-label' style={{ color: '#73be76' }}>Hesabınız Aktivləşdirildi!</div>
                    <div className='description' style={{ color: '#9fa2a2' }}>{`Email və şifrənizi daxil edərək hesabınıza giriş edə bilərsiniz`}</div>
                    <Button
                        className='sign-in-button'
                        onClick={onClickSignIn}
                        htmlType='submit'
                    >
                        Daxil Ol
                    </Button>
                </div>
            </div>
        </div>
    )
}
