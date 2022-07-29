import Heading from '@/components/atoms/custom/Heading'
import DashboardCounterCards from '@/components/molecules/dashboard/statistics/DashboardCounterCards'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'
import BarAnalytics from 'src/sections/BarAnalytics'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack</title>
            </Head>

            <Dashboard title="Dashboard">
                <div className="my-10">
                    <Heading title = {`For the current year, ${new Date().getFullYear()}`} color="black" bold/>
                    <br />
                    <DashboardCounterCards />
                </div>

                <div className="space-y-5 my-5">
                    {/* <BarAnalytics title="booking"/> */}
                    {/* <BarAnalytics title="booking" /> */}
                    <BarAnalytics title="expenses" />
                    <BarAnalytics title="debt" />
                    <BarAnalytics title="income" />

                </div>

                {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    dummy loaders
                    <div className="col-span-3 h-full bg-white rounded p-5">
                        <FakeSkeletonLoaders />
                    </div>
                    dummy loaders end here
                    <div className="col-span-2">
                        <div className="bg-white rounded p-5">
                            <ExpensesPie />
                        </div>
                    </div>
                </div> */}
            </Dashboard>
        </Fragment>
    )
}

export default Home
