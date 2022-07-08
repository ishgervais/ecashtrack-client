import ActiveLink from '@/components/atoms/links/ActiveLink'
import { Lock, User } from 'react-feather'

export default function SettingsTabBar() {

    const quickAddItemLinks = [
        {
            name: 'Profile',
            path: "/dashboard/settings/profile",
            icon:  <User size={15} strokeWidth= {1.5} />
        },
        {
            name: 'Change password',
            path: "/dashboard/settings/profile/changepassword",
            icon:  <Lock size={15} strokeWidth= {1.5} />
        }
    ]
    return (
            <div className="px-5 lg:px-10">
                <div className="my-3">
                    {
                        quickAddItemLinks.map((item: any, index: number) => {
                            return (
                                <ActiveLink
                                key={index}
                                access={['admin']}
                                href={item.path}
                                padding = "p-1"
                            >
                                {item.icon}
                                {item.name}
                            </ActiveLink>
                            )
                        })
                    }
                </div>
            </div>
    )
}
