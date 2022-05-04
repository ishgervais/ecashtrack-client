import AddExpense from '@/components/molecules/dashboard/forms/AddExpense'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

export default function add(){
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Record expense</title>
            </Head>

            <Dashboard title="record expense">
                <div>
                    {
                        <AddExpense/>
                    }
                </div>
            </Dashboard>
        </Fragment>
    )
}

