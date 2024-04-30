import React from 'react'
import { Form, Image, Button, Checkbox } from "antd";
import Link from 'next/link';
import { GoogleIcon } from '@/assets/icons';
import { useRouter } from 'next/router';
import { FloatInput, PasswordInput } from '@/components/small';
import { useRegisterUserMutation } from '@/hooks/use-register-user';
import useNotification from '@/hooks/use-notification';
import { useResultsContext } from '@/context/results-context';
import { PrivacyPolicyModal, TermsAndConditionsModal } from './components';


export default function SignUpModule() {
    const router = useRouter()
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const [acceptPrivacy, setAcceptPrivacy] = React.useState(false)
    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            showActivationForm: false,
            showTermsConditionsModal: false,
            showPrivacyPolicyModal: false,
        }
    )
    const [params, setParams] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            email: '',
            password: '',
            name: '',
            surname: '',
            password_confirmation: '',
            otp_code: '',
            token: '',
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
                onSuccess: (res) => {
                    showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' })
                    router.push({
                        pathname: '/activation',
                        query: { token: res.data?.data }
                    })
                },
                onError: () => showNotification({ title: 'Qeydiyyat zamanı xəta baş verdi.', variant: 'error' }),
            }
        )
    }


    function onFinishActivation(values) {
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

                {
                    !state.showActivationForm &&
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
                                placeholder='E-mail@nümunə.com'
                                value={params.mail}
                                onChange={(e) => setParams({ email: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[{ required: true, message: 'Please input valid password!' }]}
                        >
                            <PasswordInput
                                label='Şifrə'
                                placeholder='Şifrə'
                                value={state.password}
                                passwordVisible={passwordVisible}
                                setPasswordVisible={() => setPasswordVisible(!passwordVisible)}
                                onChange={(e) => setState({ password: e.target.value })}
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
                            <PasswordInput
                                label='Şifrəni təkrarla'
                                placeholder='Şifrənin təkrarı'
                                value={params.password_confirmation}
                                passwordVisible={passwordVisible}
                                setPasswordVisible={() => setPasswordVisible(!passwordVisible)}
                                onChange={(e) => setParams({ password_confirmation: e.target.value })}
                            />
                        </Form.Item>

                        <div className='checkbox-wrapper'>
                            <Checkbox checked={acceptPrivacy} onChange={() => setAcceptPrivacy(!acceptPrivacy)}></Checkbox>
                            <div className='checkbox-label'>
                                <b className='link' onClick={() => setState({ showTermsConditionsModal: true })}>Istifadəçi şərtləri və qaydaları</b>
                                &
                                <b className='link' onClick={() => setState({ showPrivacyPolicyModal: true })}>məxfilik siyasəti</b> ilə razıyam
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
                }
                {
                    state.showActivationForm &&
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
                }

                <TermsAndConditionsModal
                    showModal={state.showTermsConditionsModal}
                    handleOk={() => {
                        setState({ showTermsConditionsModal: false });
                        setAcceptPrivacy(true)
                    }}
                    handleCancel={() => {
                        setState({ showTermsConditionsModal: false });
                        // setAcceptPrivacy(false)
                    }}
                />

                <PrivacyPolicyModal
                    showModal={state.showPrivacyPolicyModal}
                    handleOk={() => {
                        setState({ showPrivacyPolicyModal: false });
                        setAcceptPrivacy(true)
                    }}
                    handleCancel={() => {
                        setState({ showPrivacyPolicyModal: false });
                        // setAcceptPrivacy(false)
                    }}
                />
            </div>
        </div>
    )
}