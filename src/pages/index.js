import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Loader from '@/components/large/loader';


const MainPage = dynamic(
  () => import('@/modules/main'),
  {
    ssr: false,
    loading: Loader,
  }
)


export default function Main() {
  return (
    <>
      <Head>
        <title>Legalens / Main Search</title>
      </Head>

      <MainPage />
    </>
  )
}
