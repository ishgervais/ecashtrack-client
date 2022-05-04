import ViewOneBooking from '@/components/molecules/dashboard/tables/ViewOneBooking'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Booking</title>
            </Head>

            <Dashboard title="booking">
                   <ViewOneBooking/>
            </Dashboard>
        </Fragment>
    )
}

export default Home
