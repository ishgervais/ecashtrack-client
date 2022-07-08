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

                <div className="bg-white p-10 uppercase text-primary font-bold">
                    under development
                </div>
            </Dashboard>
        </Fragment>
    )
}

export default Home
