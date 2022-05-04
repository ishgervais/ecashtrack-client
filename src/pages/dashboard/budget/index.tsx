import Button from '@/components/atoms/custom/Button'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Budget</title>
            </Head>

            <Dashboard title="budget">
                <div className="text-sm">
                    <div className="flex justify-end">
                        <div>
                            <Button title="+ Add a new budget" path="/dashboard/budget/add" />

                        </div>
                    </div>
                </div>
            </Dashboard>
        </Fragment>
    )
}

export default Home
