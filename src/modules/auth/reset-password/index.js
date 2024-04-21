import React from 'react'
import { Form, Button } from "antd";
import Link from 'next/link';
import { LegalensLogoWhite } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
import { FloatInput } from '@/components/small';
import useNotification from '@/hooks/use-notification';
import { useResetPasswordMutation } from '@/hooks/use-reset-password';


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
    const { mutate: resetPassword, isSuccess, isLoading: resetPasswordLoading } = useResetPasswordMutation({ token: router?.query.token })


    function onFinishForm(values) {
        resetPassword(
            {
                resetPassword: values.password,
                confirmResetPassword: values.password_conf,
            },
            {
                onSuccess: () => {
                    showNotification({ title: 'Uğurlu əməliyyat!', variant: 'success' })
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