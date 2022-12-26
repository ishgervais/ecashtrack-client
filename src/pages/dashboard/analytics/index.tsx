import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'
import BarAnalytics from 'src/sections/BarAnalytics'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Analytics</title>
            </Head>

            <Dashboard title="Analytics">
                <div className="">

                    <div className="space-y-5 my-5">
                        <BarAnalytics title="expenses" />
                        <BarAnalytics title="income" />
                        <BarAnalytics title="debt" />

                    </div>
                </div>
            </Dashboard>
        </Fragment>
    )
}

export default Home
