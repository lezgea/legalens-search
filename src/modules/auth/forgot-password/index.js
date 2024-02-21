import React from 'react'
import { Form, Input, Image, Button, Switch, Checkbox } from "antd";
import Link from 'next/link';
import { AuthBgLines, GoogleIcon, LegalensLogoWhite } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
// import { ReactComponent as GoogleIcon } from '@/assets/google-icon.svg';


export default function ForgotPasswordModule() {
    const router = useRouter()
    const [remember, setRemember] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    return (
        <div className='forgot-container'>
            <Icon component={AuthBgLines} className='bg-lines' />
            <div className='forgot-wrapper'>
                <Link href='/' className='white-logo-wrapper'>
                    <Icon component={LegalensLogoWhite} className='white-logo' />
                </Link>
                <Form
                    className='forgot-card'
                    name="basic"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={() => { }}
                    onFinishFailed={() => { }}
                >
                    <div className='welcome-label'>Welcome!</div>
                    <div className='input-wrapper'>
                        <div className='label'>Login</div>
                        <Input
                            placeholder="Email"
                            className='input'
                        />
                    </div>

                    <div className='input-wrapper'>
                        <div className='label'>Password</div>
                        <Input
                            placeholder="Enter password"
                            className='input'
                        />
                    </div>
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
                        <Link href='/' className='sign-up-link'>Sign up now</Link>
                    </div>
                </Form>
            </div>
        </div>

    )
}