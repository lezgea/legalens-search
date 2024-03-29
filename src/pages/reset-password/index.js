import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const ResetPasswordModule = dynamic(
    () => import('@/modules/auth/reset-password'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function ResetPasswordPage() {
    return (
        <>
            <Head>
                <title>Legalens | Reset Password Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ResetPasswordModule />
        </>
    );
}