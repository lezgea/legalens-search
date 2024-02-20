import '@/styles/global.scss'
import { Poppins } from 'next/font/google'
import { SearchContextProvider } from '../context'
import { ResultsContextProvider } from '@/context/results-context'
import { QueryClient, QueryClientProvider } from "react-query";
import Router from 'next/router';
// import "antd/dist/antd.css";


const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const queryClient = new QueryClient();


export default function MyApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <main className={poppins.className}>
                <SearchContextProvider>
                    <ResultsContextProvider>
                        <Component {...pageProps} />
                    </ResultsContextProvider>
                </SearchContextProvider>
            </main >
        </QueryClientProvider>
    )
}
