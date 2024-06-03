import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Loader from '@/components/large/loader';


const EmailTemplatePage = dynamic(
  () => import('@/modules/email-template'),
  {
    ssr: false,
    loading: Loader,
  }
)


export default function EmailTemplate() {
  return (
    <>
      <Head>
        <title>Legalens / Email Template</title>
      </Head>

      <EmailTemplatePage />
    </>
  )
}
