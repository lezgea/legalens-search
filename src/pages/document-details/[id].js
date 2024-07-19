import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';



const DocumentDetailsModule = dynamic(
    () => import('@/modules/document-details'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function DocumentDetailsPage() {
    return (
        <>
            <Head>
                <title>Legalens | Document Details Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DocumentDetailsModule />
        </>
    );
}