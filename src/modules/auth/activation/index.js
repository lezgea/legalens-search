import React from 'react'
import { Form, Input, Image, Button, Switch, Checkbox } from "antd";
import Link from 'next/link';
import { GoogleIcon, AuthBgLines, LegalensLogoWhite, LegalensLogo } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
import { FloatInput } from '@/components/small';
import { useRegisterUserMutation } from '@/hooks/use-register-user';
import useNotification from '@/hooks/use-notification';
import { useActivateUserMutation } from '@/hooks/use-activate-user';


export default function ActivationModule() {
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


    function onFinishActivation(values) {
        activateUser(
            {
                confirmationToken: router.query?.token,
                otp: params.otp_code,
            },
            {
                onSuccess: () => {
                    showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' })
                    router.push('/sign-up-confirmation')
                },
                onError: () => showNotification({ title: 'Qeydiyyat zamanı xəta baş verdi.', variant: 'error' }),
            }
        )
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
                <Form
                    className='sign-in-card'
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinishActivation}
                    onFinishFailed={() => { }}
                >
                    <div className='welcome-label'>Check your email</div>
                    <div className='description'>{`We've sent an OTP code to ${params.email} paste your code down below.`}</div>
                    <Form.Item
                        name='name'
                        rules={[{ required: true, message: 'Please input your code!' }]}
                    >
                        <FloatInput
                            label='Code'
                            value={params.otp_code}
                            onChange={(e) => setParams({ otp_code: e.target.value })}
                            style={{ fontSize: 26, textAlign: 'center' }}
                        />
                    </Form.Item>
                    <Button
                        loading={activateUserLoading}
                        className='sign-in-button'
                        onClick={onFinishActivation}
                        htmlType='submit'
                    >
                        Activate
                    </Button>

                    <div className='card-bottom-line'>
                        <div>Hesabınız var?</div>
                        <Link href='/sign-in' className='sign-up-link'>Daxil  ol</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}