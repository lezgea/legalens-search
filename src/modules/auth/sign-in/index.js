import React from 'react'
import { Form, Input, Image, Button, Switch, Checkbox } from "antd";
import Link from 'next/link';
import { GoogleIcon, AuthBgLines, LegalensLogoWhite } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
import { FloatInput } from '@/components/small';


export default function SignInModule() {
    const router = useRouter()
    const [remember, setRemember] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            email: '',
            password: '',
        }
    )

    return (
        <div className='sign-in-container'>
            <Icon component={AuthBgLines} className='bg-lines' />
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
                    onFinish={() => { }}
                    onFinishFailed={() => { }}
                >
                    <div className='welcome-label'>Xoş gəlmişsiniz !</div>
                    <FloatInput
                        label='E-mail'
                        placeholder='mail@example.com'
                        value={state.email}
                        onChange={(e) => setState({ email: e.target.value })}
                    />
                    <FloatInput
                        label='Şifrə'
                        placeholder='Şifrə'
                        value={state.password}
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
                        <Link className='forgot-link' href='/forgot-password'>Forgot password?</Link>
                    </div>
                    <Button
                        loading={loading}
                        className='sign-in-button'
                        onClick={() => setLoading(true)}
                    >
                        Sign In
                    </Button>
                    <Button
                        icon={<GoogleIcon />}
                        className='google-button'
                        onClick={() => { }}
                    >
                        Or sign in with Google
                    </Button>
                    <div className='card-bottom-line'>
                        <div>Dont have an account?</div>
                        <Link href='/sign-up' className='sign-up-link'>Sign up now</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}