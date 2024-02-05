import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';



const ResultDetailsModule = dynamic(
    () => import('@/modules/result-details'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function ResultDetailsPage() {
    return (
        <>
            <Head>
                <title>Legalens | Result Details Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ResultDetailsModule />
        </>
    );
}