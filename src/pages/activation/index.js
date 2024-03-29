import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const ActivationModule = dynamic(
    () => import('@/modules/auth/activation'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function ActivationPage() {
    return (
        <>
            <Head>
                <title>Legalens | Account Activation Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ActivationModule />
        </>
    );
}