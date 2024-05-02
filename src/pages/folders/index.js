import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const FoldersModule = dynamic(
    () => import('@/modules/folders'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function FoldersPage() {
    return (
        <>
            <Head>
                <title>Legalens | Folders Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FoldersModule />
        </>
    );
}