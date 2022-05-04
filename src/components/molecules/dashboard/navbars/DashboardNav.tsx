
import Heading from '@/components/atoms/custom/Heading'
import IconHolder from '@/components/atoms/icons/IconHolder'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { Bell, LogOut, Moon, Plus, Search, User } from 'react-feather'
import { AppContext } from 'src/context/GlobalContext'
import AddItem from '../dropdowns/AddItem'
import Notifications from '../dropdowns/Notifications'

type DashboardNavType = {
    title: string
    children?: object
}
type ToggleHandler = {
    isOpen: boolean
    index: number
}


export default function DashboardNav(props: DashboardNavType) {
    const [toggle, handleToggle] = useState<ToggleHandler>({
        isOpen: false,
        index: -1
    })

    const { user, setUser }: any = useContext(AppContext)

    const router = useRouter()

    const logout = () => {
        localStorage.clear()
        setUser(null)
        router.push("/")
    }
    return (
        <div className="bg-white top-0 sticky w-full space-y-5 md:space-y-0 grid grid-cols-1 md:grid-cols-3 items-center py-2 px-10 z-10">
            <Heading title={props.title} size="sm" bold capitalize />

            <div className="form-group border flex items-center gap-4 pl-3 rounded-full ">
                <Search className="text-gray-500" strokeWidth={0.5} />
                <input type="search" placeholder="Search " id="search" className="text-xs rounded-full w-full h-full py-2 focus:outline-none"
                />
            </div>

            <div className="flex md:justify-end">
                <div className="flex space-x-2 items-center">
                    {/* plus */}
                    <div
                        className="relative"
                        onClick={() => {
                            handleToggle({
                                isOpen: (toggle.index === 0 ? false : true) || !toggle.isOpen,
                                index: 0
                            })
                        }}
                    >
                        <IconHolder
                            static
                            icon={<Plus size={12} />}
                            size="sm"
                            active={toggle.isOpen && toggle.index === 0 && true}
                        />
                        {toggle.isOpen && toggle.index === 0 && <AddItem />}
                    </div>

                    {/* dark/light mode */}

                    <IconHolder
                        static
                        icon={<Moon size={12} />}
                        size="sm"
                        active={toggle.isOpen && toggle.index === 1 && true}
                    />
                    {toggle.isOpen && toggle.index === 1 && <Notifications />}

                    {/* notifications */}
                    <div
                        className="relative"
                        onClick={() => {
                            handleToggle({
                                isOpen: (toggle.index === 2 ? false : true) || !toggle.isOpen,
                                index: 2
                            })
                        }}
                    >
                        <IconHolder
                            static
                            icon={<Bell size={12} />}
                            size="sm"
                            handleClick={() => router.push('/dashboard/logs')}
                            // active={toggle.isOpen && toggle.index === 2 && true}
                        />
                        {/* {toggle.isOpen && toggle.index === 2 && (
                            <Notifications />
                        )} */}

                    </div>
                    <IconHolder
                        static
                        icon={<LogOut size={12} />}
                        size="sm"
                        handleClick={() => logout()}
                    />

                    <div className="flex items-center gap-2">
                        {/* <AvatarHolder image="images/pro.jpg" size="sm" /> */}
                        <div className="bg-primary h-8 w-8 rounded-full flex text-white items-center justify-center">
                            <User size={15} />
                        </div>
                        <span className="text-xs text-gray-600">{user?.first_name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
