import React from 'react'
import { Form, Input, Image, Button, Switch, Checkbox } from "antd";
import Link from 'next/link';
import { AuthBgLines, GoogleIcon, LegalensLogoWhite } from '@/assets/icons';
import { useRouter } from 'next/router';
import Icon from '@ant-design/icons';
import { FloatInput } from '@/components/small';
import useNotification from '@/hooks/use-notification';
import { useForgotUserMutation } from '@/hooks/use-forgot-user';
// import { ReactComponent as GoogleIcon } from '@/assets/google-icon.svg';


export default function ForgotPasswordModule() {
    const router = useRouter()
    const [remember, setRemember] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            email: '',
        }
    )

    const { showNotification } = useNotification()
    const { mutate: forgotUser, isSuccess, isLoading: forgotUserLoading } = useForgotUserMutation()


    function onFinishForm(values) {
        forgotUser(
            {
                email: values.email,
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
                        name='email'
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <FloatInput
                            label='E-mail'
                            placeholder='E-mail'
                            value={state.email}
                            onChange={(e) => setState({ email: e.target.value })}
                        />
                    </Form.Item>


                    <div className='card-bottom-line'>
                        <div>və ya</div>
                        <Link href='/sign-in' className='sign-up-link'>Daxil olun</Link>
                    </div>
                    <Button
                        loading={loading}
                        className='sign-in-button'
                        onClick={onFinishForm}
                    >
                        Göndər
                    </Button>
                </Form>
            </div>
        </div>
    )
}