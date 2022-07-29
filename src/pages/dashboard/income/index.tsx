import Incomes from '@/components/molecules/dashboard/tables/Income'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Income </title>
            </Head>

            <Dashboard title="Income">
                   <Incomes/>
            </Dashboard>
        </Fragment>
    )
}

export default Home
