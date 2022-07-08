import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Settings</title>
            </Head>

            <Dashboard title="settings">
            </Dashboard>
        </Fragment>
    )
}

export default Home
