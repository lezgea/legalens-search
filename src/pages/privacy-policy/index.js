import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';



const PrivacyPolicyModule = dynamic(
    () => import('@/modules/privacy-policy'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function ResultsPage() {
    return (
        <>
            <Head>
                <title>Legalens | Privacy Policy Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PrivacyPolicyModule />
        </>
    );
}