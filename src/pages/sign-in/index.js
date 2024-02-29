import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const SignInModule = dynamic(
    () => import('@/modules/auth/sign-in'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function SignInPage() {
    return (
        <>
            <Head>
                <title>Legalens | Sign In Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignInModule />
        </>
    );
}