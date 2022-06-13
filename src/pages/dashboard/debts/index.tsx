import Debts from '@/components/molecules/dashboard/tables/Debts'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Debts</title>
            </Head>

            <Dashboard title="debts">
                   <Debts/>
            </Dashboard>
        </Fragment>
    )
}

export default Home
