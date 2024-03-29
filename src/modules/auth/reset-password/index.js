import React from 'react'
import { Form, Input, Image, Button, Switch, Checkbox } from "antd";
import Link from 'next/link';
import { AuthBgLines, GoogleIcon, LegalensLogoWhite } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
import { FloatInput } from '@/components/small';
import useNotification from '@/hooks/use-notification';
import { useForgotUserMutation } from '@/hooks/use-forgot-user';
import { useResetPasswordMutation } from '@/hooks/use-reset-password';
// import { ReactComponent as GoogleIcon } from '@/assets/google-icon.svg';


export default function ResetPasswordModule() {
    const router = useRouter()
    const [remember, setRemember] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            password: '',
            password_conf: '',
        }
    )

    const { showNotification } = useNotification()
    const { mutate: resetPassword, isSuccess, isLoading: resetPasswordLoading } = useResetPasswordMutation({token: router?.query.token})


    function onFinishForm(values) {
        resetPassword(
            {
                resetPassword: values.password,
                confirmResetPassword: values.password_conf,
            },
            {
                onSuccess: () => {
                    showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' })
                    // setState({ showActivationForm: true })
                },
                onError: () =>
                    showNotification({ title: 'Qeydiyyat zamanı xəta baş verdi.', variant: 'error' }),
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
                    <div className='welcome-label'>Şifrənin yenilənməsi</div>
                    <Form.Item
                        name='password'
                        rules={[{ required: true, message: 'Please input new password!' }]}
                    >
                        <FloatInput
                            label='Yeni Şifrə'
                            placeholder='Yeni Şifrə'
                            value={state.password}
                            onChange={(e) => setState({ password: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        name='password_conf'
                        rules={[{ required: true, message: 'Please confirm new password!' }]}
                    >
                        <FloatInput
                            label='Şifrəni Təsdiqlə'
                            placeholder='Şifrəni Təsdiqlə'
                            value={state.password_conf}
                            onChange={(e) => setState({ password_conf: e.target.value })}
                        />
                    </Form.Item>

                    {/* <div className='card-bottom-line'>
                        <div>və ya</div>
                        <Link href='/sign-in' className='sign-up-link'>Daxil olun</Link>
                    </div> */}
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
                        onClick={onFinishForm}
                    >
                        Şifrəni Yenilə
                    </Button>
                </Form>
            </div>
        </div>
    )
}