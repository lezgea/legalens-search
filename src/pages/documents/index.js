import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';



const DocumentsModule = dynamic(
    () => import('@/modules/documents'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function DocumentsPage() {
    return (
        <>
            <Head>
                <title>Legalens | Documents Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DocumentsModule />
        </>
    );
}