import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Loader from '@/components/large/loader';


const ProfilePage = dynamic(
  () => import('@/modules/profile'),
  {
    ssr: false,
    loading: Loader,
  }
)


export default function Profile() {
  return (
    <>
      <Head>
        <title>Legalens / Profile</title>
      </Head>

      <ProfilePage />
    </>
  )
}
