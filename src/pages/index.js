import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';


const MainPage = dynamic(
  () => import('@/modules/main'),
  { ssr: true }
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
