import AddExpenseCategory from '@/components/molecules/dashboard/forms/AddExpenseCategory'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

export default function add(){
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Record expense category</title>
            </Head>

            <Dashboard title="record expense">
                <div>
                    {
                        <AddExpenseCategory/>
                    }
                </div>
            </Dashboard>
        </Fragment>
    )
}

