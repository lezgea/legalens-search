import '@/styles/global.scss'
import { Poppins } from 'next/font/google'
import { SearchContextProvider } from '../context'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})


export default function MyApp({ Component, pageProps }) {
    return (
        <main className={poppins.className}>
            <SearchContextProvider>
                <Component {...pageProps} />
            </SearchContextProvider>
        </main >
    )
}
