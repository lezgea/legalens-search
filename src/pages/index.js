import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// import { Loader } from '@/components/large';


// const LoaderComponent = dynamic(
//   () => import('@/components/large'),
//   {
//     ssr: false,
//     // loading: () => <Loader />,
//   }
// )


const MainPage = dynamic(
  () => import('@/modules/main'),
  {
    ssr: false,
    // loading: () => <LoaderComponent />,
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
