import React from 'react'
import { Form, Input, Image, Button, Switch, Checkbox } from "antd";
import Link from 'next/link';
import { AuthBgLines, GoogleIcon, LegalensLogoWhite } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
import { FloatInput } from '@/components/small';
// import { ReactComponent as GoogleIcon } from '@/assets/google-icon.svg';


export default function ForgotPasswordModule() {
    const router = useRouter()
    const [remember, setRemember] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            password: '',
            password_confirmation: '',
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
                        label='Şifrə'
                        placeholder='Şifrə'
                        value={state.password}
                        onChange={(e) => setState({ password: e.target.value })}
                    />
                    <FloatInput
                        label='Şifrəni təkrarla'
                        placeholder='Şifrənin təkrarı'
                        value={state.password_confirmation}
                        onChange={(e) => setState({ password_confirmation: e.target.value })}
                    />
                    <div className='card-bottom-line'>
                        <div>və ya</div>
                        <Link href='/sign-in' className='sign-up-link'>Daxil olun</Link>
                    </div>
                    {/* <div className='bottom-line-wrapper'>
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
                    </div> */}
                    <Button
                        loading={loading}
                        className='sign-in-button'
                        onClick={() => setLoading(true)}
                    >
                        Yadda Saxla
                    </Button>
                </Form>
            </div>
        </div>
    )
}