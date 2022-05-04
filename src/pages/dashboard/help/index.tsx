import FrequentAskedQuestion from '@/components/molecules/dashboard/help/FrequentAskedQuestion'
import SearchInput from '@/components/molecules/dashboard/help/SearchInput'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import Dashboard from 'src/layouts/Dashboard'

const Home: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>E-CashTrack | Help</title>
            </Head>

            <Dashboard title="help">
                <div className='block align-items'>
                    <SearchInput />
                    <FrequentAskedQuestion />
                </div>

            </Dashboard>
        </Fragment>
    )
}

export default Home
