import AddBookingDate from '@/components/molecules/dashboard/forms/AddBookingDate'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

export default function add(){
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Record booking date </title>
            </Head>

            <Dashboard title="record expense">
                <div>
                    {
                        <AddBookingDate/>
                    }
                </div>
            </Dashboard>
        </Fragment>
    )
}

