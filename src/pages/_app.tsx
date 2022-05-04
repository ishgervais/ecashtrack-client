import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

import Router from 'next/router'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css' //styles of nprogress
import { Toaster } from 'react-hot-toast'
import { GlobalContext } from 'src/context/GlobalContext'
import Head from 'next/head'

//Binding events.
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
const queryclient = new QueryClient()

    return (
        <ThemeProvider attribute="class">
            <QueryClientProvider client={queryclient}>
                <GlobalContext>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 5000,
                    }}
                />
              <Head>
              <link rel="icon" href="/images/logo.png" />
              </Head>
              <Component {...pageProps} />
                </GlobalContext>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default MyApp
