import React from 'react'
import { Form, Image, Button } from "antd";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FloatInput } from '@/components/small';
import useNotification from '@/hooks/use-notification';
import { useActivateUserMutation } from '@/hooks/use-activate-user';


export default function ActivationModule() {
    const router = useRouter()
    const [params, setParams] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }),
        {
            otp_code: '',
        }
    )
    const { showNotification } = useNotification()
    const { mutate: activateUser, isSuccess, isLoading: activateUserLoading } = useActivateUserMutation()


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
                    <div className='welcome-label'>Mail qutunuzu yoxlayın</div>
                    <div className='description'>{`Sizə göndərilmiş OTP kodunu daxil edin`}</div>
                    <Form.Item
                        name='name'
                        rules={[{ required: true, message: 'Kodu daxil edin!' }]}
                    >
                        <FloatInput
                            label='Kod'
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
                        Aktivləşdir
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