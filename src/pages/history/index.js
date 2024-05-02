import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const HistoryModule = dynamic(
    () => import('@/modules/history'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function HistoryPage() {
    return (
        <>
            <Head>
                <title>Legalens | History Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HistoryModule />
        </>
    );
}