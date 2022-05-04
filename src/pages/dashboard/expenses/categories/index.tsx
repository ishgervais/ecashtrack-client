import ExpenseCategories from '@/components/molecules/dashboard/tables/ExpenseCategories'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Expense Categories</title>
            </Head>

            <Dashboard title="expense categories">
                   <ExpenseCategories/>
            </Dashboard>
        </Fragment>
    )
}

export default Home
