import AddBooking from '@/components/molecules/dashboard/forms/AddBooking'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

export default function add(){
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Record budget </title>
            </Head>

            <Dashboard title="record booking">
                <div>
                    {
                        <AddBooking/>
                    }
                </div>
            </Dashboard>
        </Fragment>
    )
}

