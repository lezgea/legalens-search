import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const SignUpConfirmationModule = dynamic(
    () => import('@/modules/auth/sign-up-confirmation'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function SignUpConfirmationPage() {
    return (
        <>
            <Head>
                <title>Legalens | Sign Up Confirmation</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignUpConfirmationModule />
        </>
    );
}