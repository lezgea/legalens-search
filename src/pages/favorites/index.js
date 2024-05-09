import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Loader from '@/components/large/loader';


const FavoritesModule = dynamic(
    () => import('@/modules/favorites'),
    {
        ssr: false,
        loading: Loader,
    }
)


export default function FavoritesPage() {
    return (
        <>
            <Head>
                <title>Legalens | Favorites Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FavoritesModule />
        </>
    );
}