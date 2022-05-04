import ExpenseCategories from '@/components/molecules/dashboard/tables/ExpenseCategories'
import Expenses from '@/components/molecules/dashboard/tables/Expenses'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Expenses</title>
            </Head>

            <Dashboard title="expenses">
                   <Expenses/>
            </Dashboard>
        </Fragment>
    )
}

export default Home
