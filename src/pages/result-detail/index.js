import React from 'react';
import dynamic from "next/dynamic";


const ResultDetailModule = dynamic(
    () => import('@/modules/result-detail'),
    { ssr: false }
)


export default function ResultDetailPage() {
    return (
        <>
            <Head>
                <title>Legalens | Result Detail Page</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <ResultDetailModule />
        </>
    )
}