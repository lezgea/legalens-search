import React from 'react'
import { Form, Input, Image, Button, Switch, Checkbox } from "antd";
import Link from 'next/link';
import { GoogleIcon, AuthBgLines, LegalensLogoWhite, LegalensLogo, CircleQuestionIcon } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon, { CheckCircleFilled } from '@ant-design/icons';
import { FloatInput } from '@/components/small';
import { useRegisterUserMutation } from '@/hooks/use-register-user';
import useNotification from '@/hooks/use-notification';
import { useActivateUserMutation } from '@/hooks/use-activate-user';


export default function SignUpConfirmationModule() {
    const router = useRouter()
    const [remember, setRemember] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [acceptPrivacy, setAcceptPrivacy] = React.useState(false)
    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            showActivationForm: false,
        }
    )
    const [params, setParams] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            otp_code: '',
        }
    )
    const { showNotification } = useNotification()
    const { mutate: activateUser, isSuccess, isLoading: activateUserLoading } = useActivateUserMutation()

    let legalSourceID = localStorage.getItem('legalSourceID')
    let legalCompanyID = localStorage.getItem('legalCompanyID')


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
                    {/* <Icon component={CheckCircleOutlin} className='success-icon' /> */}
                    <div className='welcome-label' style={{ color: '#73be76' }}>Hesabınız Activləşdirildi!</div>
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