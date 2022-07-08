import ChangePassword from '@/components/molecules/dashboard/forms/ChangePassword'
import type { NextPage } from 'next'
import SettingsLayout from 'src/layouts/SettingsLayout'

const Home: NextPage = () => {
    return (
    <SettingsLayout>
           <ChangePassword />
    </SettingsLayout>
    )
}

export default Home
