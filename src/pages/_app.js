import App from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import '../styles/global.css'


export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}
