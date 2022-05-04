import AddBudget from '@/components/molecules/dashboard/forms/AddBudget'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

export default function add(){
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Record budget </title>
            </Head>

            <Dashboard title="record expense">
                <div>
                    {
                        <AddBudget/>
                    }
                </div>
            </Dashboard>
        </Fragment>
    )
}

