import AddIncomeSource from '@/components/molecules/dashboard/forms/AddIncomeSource'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

export default function add(){
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Record income source</title>
            </Head>

            <Dashboard title="record income source">
                <div>
                    {
                        <AddIncomeSource/>
                    }
                </div>
            </Dashboard>
        </Fragment>
    )
}

