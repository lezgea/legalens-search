import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";


const ResultsModule = dynamic(
    () => import('../../modules/results'),
    { ssr: false }
)


export default function ResultsPage() {
    return (
        <>
            <Head>
                <title>Legalens / Results Page</title>
            </Head>
            <ResultsModule />
        </>
    );
}