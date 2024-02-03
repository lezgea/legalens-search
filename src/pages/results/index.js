import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
// import { Loader } from '@/components/large';


const ResultsModule = dynamic(
    () => import('@/modules/results'),
    {
        ssr: false,
        // loading: <Loader />
    }
)


export default function ResultsPage() {
    return (
        <>
            <Head>
                <title>Legalens | Results Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ResultsModule />
        </>
    );
}