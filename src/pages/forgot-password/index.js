import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const ForgotPasswordModule = dynamic(
    () => import('@/modules/auth/forgot-password'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function ForgotPasswordPage() {
    return (
        <>
            <Head>
                <title>Legalens | Forgot Password Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ForgotPasswordModule />
        </>
    );
}