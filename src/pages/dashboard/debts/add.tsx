import AddDebt from '@/components/molecules/dashboard/forms/AddDebt'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

export default function add(){
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Record debt</title>
            </Head>

            <Dashboard title="record debt">
                <div>
                    {
                        <AddDebt/>
                    }
                </div>
            </Dashboard>
        </Fragment>
    )
}

