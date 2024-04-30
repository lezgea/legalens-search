import React from 'react'
import { Form, Button, Switch } from "antd";
import Link from 'next/link';
import { GoogleIcon, LegalensLogoWhite } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
import { FloatInput, PasswordInput } from '@/components/small';
import { useLoginUserMutation } from '@/hooks/use-login-user';
import useNotification from '@/hooks/use-notification';
import { setAuthCookies } from '@/utils/cookies';


export default function SignInModule() {
    const router = useRouter()
    const [remember, setRemember] = React.useState(true)
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            email: '',
            password: '',
        }
    )
    const { mutate: loginUser, isSuccess, isLoading: loginUserLoading } = useLoginUserMutation()
    const { showNotification } = useNotification()


    function onFinishForm(values) {
        loginUser(
            {
                email: state.email,
                password: state.password,
            },
            {
                onSuccess: (res) => {
                    showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' })
                    setAuthCookies(res.data?.data?.token)
                    router.push({ pathname: '/' })
                },
                onError: () => showNotification({ title: 'Giriş zamanı xəta baş verdi.', variant: 'error' }),
            }
        )
    }


    return (
        <div className='sign-in-container'>
            <div className='sign-in-wrapper'>
                <Link href='/' className='white-logo-wrapper'>
                    <Icon component={LegalensLogoWhite} className='white-logo' />
                </Link>
                <Form
                    className='sign-in-card'
                    name="basic"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinishForm}
                    onFinishFailed={() => { }}
                >
                    <div className='welcome-label'>Xoş gəlmişsiniz !</div>
                    <FloatInput
                        label='E-mail'
                        placeholder='E-mail@nümunə.com'
                        value={state.email}
                        onChange={(e) => setState({ email: e.target.value })}
                    />
                    <PasswordInput
                        label='Şifrə'
                        placeholder='Şifrə'
                        value={state.password}
                        passwordVisible={passwordVisible}
                        setPasswordVisible={() => setPasswordVisible(!passwordVisible)}
                        onChange={(e) => setState({ password: e.target.value })}
                    />
                    <div className='bottom-line-wrapper'>
                        <div className='remember-me-wrapper'>
                            <Switch
                                size="medium"
                                checked={remember}
                                defaultChecked
                                style={{ background: remember ? 'linear-gradient(249deg, #FFB39B 10.24%, #CD75EB 101.13%)' : '#dedede' }}
                                onChange={() => setRemember(!remember)}
                            />
                            <div className='remember-title'>Remember me</div>
                        </div>
                        <Link className='forgot-link' href='/forgot-password'>Şifrəni Unutduz?</Link>
                    </div>
                    <Button
                        loading={loginUserLoading}
                        disabled={!state.email || !state.password}
                        className={(!state.email || !state.password) ? 'sign-in-button-disabled' : 'sign-in-button'}
                        onClick={onFinishForm}
                    >
                        Daxil Ol
                    </Button>
                    <Button
                        icon={<GoogleIcon />}
                        className='google-button'
                        onClick={() => { }}
                    >
                        Or sign in with Google
                    </Button>
                    <div className='card-bottom-line'>
                        <div>Hesabınız Yoxdur ?</div>
                        <Link href='/sign-up' className='sign-up-link'>Qeydiyyatdan Keçin</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}