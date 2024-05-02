import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const SelectedModule = dynamic(
    () => import('@/modules/selected'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function SelectedPage() {
    return (
        <>
            <Head>
                <title>Legalens | Selected Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SelectedModule />
        </>
    );
}