import SettingsTabBar from '@/components/molecules/dashboard/cards/SettingsTabBar'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'


type SettingsLayout = {
    children: object
}

export default function SettingsLayout(props: SettingsLayout) {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Settings</title>
            </Head>

            <Dashboard title="settings">

                <div className="grid md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-1">
                        <SettingsTabBar />
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        {props.children}

                    </div>

                </div>
            </Dashboard>
        </Fragment>
    )
}

