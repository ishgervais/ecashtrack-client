import LogRowCard from '@/components/molecules/dashboard/cards/LogRowCard'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const HistoryLogs: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Logs</title>
            </Head>

            <Dashboard title="History logs">
               <LogRowCard/>
            </Dashboard>
        </Fragment>
    )
}

export default HistoryLogs
