import Heading from '@/components/atoms/custom/Heading'
// import ChristmasCard from '@/components/molecules/dashboard/cards/ChristmasCard'
import DashboardCounterCards from '@/components/molecules/dashboard/statistics/DashboardCounterCards'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import DashboardDoubledSidebar from 'src/layouts/DashboardDoubledSidebar'
import BarAnalytics from 'src/sections/BarAnalytics'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack</title>
            </Head>

            <DashboardDoubledSidebar title="Dashboard">
                <div className="my-10 text-black">
                    {/* christmas wishes & has a bug to fix later */}
                    {/* <ChristmasCard /> */}
                    <Heading title={`For the current year, ${new Date().getFullYear()}`} color="black" bold />
                    <br />
                    <DashboardCounterCards />
                </div>

                <div className="space-y-5 my-5">
                    <BarAnalytics title="expenses" />
                    <BarAnalytics title="income" />
                    <BarAnalytics title="debt" />

                </div>
            </DashboardDoubledSidebar>
        </Fragment>
    )
}

export default Home
