import React from 'react'
import { Form, Input, Image, Button, Switch, Checkbox } from "antd";
import Link from 'next/link';
import { GoogleIcon, AuthBgLines, LegalensLogoWhite, LegalensLogo } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
import { FloatInput } from '@/components/small';
import { useRegisterUserMutation } from '@/hooks/use-register-user';
import useNotification from '@/hooks/use-notification';


export default function SignUpModule() {
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
            email: '',
            password: '',
            name: '',
            surname: '',
            password_confirmation: '',
        }
    )
    const { showNotification } = useNotification()
    const { mutate: registerUser, isSuccess, isLoading: registerUserLoading } = useRegisterUserMutation()

    let legalSourceID = localStorage.getItem('legalSourceID')
    let legalCompanyID = localStorage.getItem('legalCompanyID')


    function onFinishForm(values) {
        registerUser(
            {
                email: values.email,
                password: values.password,
                name: values.name,
                surname: values.surname,
                compaignId: legalCompanyID,
                source: legalSourceID,
            },
            {
                onSuccess: () => {
                    showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' })
                    // setState({ showActivationForm: true })
                },
                onError: () => showNotification({ title: 'Qeydiyyat zamanı xəta baş verdi.', variant: 'error' }),
            }
        )
    }


    function onFinishActivation(values) {
        // registerUser(
        //     {
        //         email: values.email,
        //         password: values.password,
        //         name: values.name,
        //         surname: values.surname,
        //         compaignId: legalCompanyID,
        //         source: legalSourceID,
        //     },
        //     {
        //         onSuccess: () => {
        //             showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' })
        //             router.push('/sign-up-confirmation')
        //         },
        //         onError: () => showNotification({ title: 'Qeydiyyat zamanı xəta baş verdi.', variant: 'error' }),
        //     }
        // )
    }


    const SignUpForm = () => (
        <Form
            name="basic"
            className='sign-in-card'
            initialValues={{ remember: true }}
            onFinish={onFinishForm}
            onFinishFailed={() => { }}
        >
            <div className='main-label'>Qeydiyyat</div>
            <Form.Item
                name='name'
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <FloatInput
                    label='Ad'
                    value={params.name}
                    onChange={(e) => setParams({ name: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                name='surname'
                rules={[{ required: true, message: 'Please input your surname!' }]}
            >
                <FloatInput
                    label='Soyad'
                    value={params.surname}
                    onChange={(e) => setParams({ surname: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                name='email'
                rules={[{ required: true, message: 'Please input valid email!' }]}
            >
                <FloatInput
                    label='E-mail'
                    placeholder='mail@example.com'
                    value={params.mail}
                    onChange={(e) => setParams({ email: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input valid password!' }]}
            >
                <FloatInput
                    label='Şifrə'
                    value={params.password}
                    onChange={(e) => setParams({ password: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                name='password_confirmation'
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <FloatInput
                    label='Şifrəni təkrarla'
                    placeholder='Şifrənin təkrarı'
                    value={params.password_confirmation}
                    onChange={(e) => setParams({ password_confirmation: e.target.value })}
                />
            </Form.Item>

            <div className='checkbox-wrapper'>
                <Checkbox checked={acceptPrivacy} onChange={() => setAcceptPrivacy(!acceptPrivacy)}></Checkbox>
                <div className='checkbox-label'>
                    <Link href='/terms-conditions' className='link'>Istifadəçi şərtləri və qaydaları</Link>
                    &
                    <Link href='/privacy-policy' className='link'>məxfilik siyasəti</Link> ilə razıyam
                </div>
            </div>

            <Button
                icon={<GoogleIcon />}
                className='google-button'
                onClick={() => showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' })}
            >
                Google hesabı ilə qeydiyyatdan keç
            </Button>
            <Button
                disabled={!acceptPrivacy}
                loading={registerUserLoading}
                className={acceptPrivacy ? 'sign-in-button' : 'disabled-button'}
                onClick={onFinishForm}
                htmlType='submit'
            >
                Qeydiyyatdan keç
            </Button>
            <div className='card-bottom-line'>
                <div>Hesabınız var?</div>
                <Link href='/sign-in' className='sign-up-link'>Daxil  ol</Link>
            </div>
        </Form>
    )


    const ActivationForm = () => (
        <Form
            className='sign-in-card'
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinishActivation}
            onFinishFailed={() => { }}
        >
            <div className='welcome-label'>Check your email</div>
            <div className='description'>{`We've sent an OTP code to ${params.email} paste your code down below.`}</div>
            {/* <Form.Item
                name='name'
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <FloatInput
                    label='Ad'
                    value={params.name}
                    onChange={(e) => setParams({ name: e.target.value })}
                />
            </Form.Item> */}
            <Button
                loading={registerUserLoading}
                className='sign-in-button'
                onClick={onFinishForm}
                htmlType='submit'
            >
                Activate
            </Button>

            <div className='card-bottom-line'>
                <div>Hesabınız var?</div>
                <Link href='/sign-in' className='sign-up-link'>Daxil  ol</Link>
            </div>
        </Form>
    )


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
                {/* <SignUpForm /> */}
                {!state.showActivationForm && <SignUpForm />}
                {state.showActivationForm && <ActivationForm />}
            </div>
        </div>
    )
}