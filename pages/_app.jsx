import Head from "next/head"
import Navigation from "@components/Navigation"

import "@styles/globals.sass"


export default function App({ Component, pageProps })
{
    return (
        <>
            <Head>
                <title>Anime Manager</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Navigation/>
            <Component {...pageProps}/>
        </>
    )
}
