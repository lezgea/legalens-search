import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";


const ResultDetailModule = dynamic(
    () => import('../../modules/result-detail'),
    { ssr: false }
)


export default function ResultDetailPage() {
    return (
        <>
            <Head>
                <title>Legalens / Result Detail Page</title>
            </Head>
            <ResultDetailModule />
        </>
    );
}