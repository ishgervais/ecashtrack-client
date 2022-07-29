import AddExpense from '@/components/molecules/dashboard/forms/AddExpense'
import AddIncome from '@/components/molecules/dashboard/forms/AddIncome'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

export default function add(){
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Record income</title>
            </Head>

            <Dashboard title="record income">
                <div>
                    {
                        <AddIncome/>
                    }
                </div>
            </Dashboard>
        </Fragment>
    )
}

