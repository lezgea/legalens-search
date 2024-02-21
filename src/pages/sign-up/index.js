import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const SignUpModule = dynamic(
    () => import('@/modules/auth/sign-up'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function SignUpPage() {
    return (
        <>
            <Head>
                <title>Legalens | Sign Up Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignUpModule />
        </>
    );
}