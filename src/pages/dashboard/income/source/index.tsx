import IncomeSources from '@/components/molecules/dashboard/tables/IncomeSources'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | income sources</title>
            </Head>

            <Dashboard title="income sources">
                   <IncomeSources/>
            </Dashboard>
        </Fragment>
    )
}

export default Home
