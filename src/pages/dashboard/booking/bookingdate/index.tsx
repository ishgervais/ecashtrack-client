import BookingDate from '@/components/molecules/dashboard/tables/BookingDate'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Booking Dates</title>
            </Head>

            <Dashboard title="booking dates">
                   <BookingDate/>
            </Dashboard>
        </Fragment>
    )
}

export default Home
