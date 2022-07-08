import EditProfile from '@/components/molecules/dashboard/forms/EditProfile'
import type { NextPage } from 'next'
import SettingsLayout from 'src/layouts/SettingsLayout'

const Home: NextPage = () => {
    return (
    <SettingsLayout>
           <EditProfile />
    </SettingsLayout>
    )
}

export default Home
