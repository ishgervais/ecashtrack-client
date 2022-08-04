/* eslint-disable @next/next/no-img-element */
import Heading from '@/components/atoms/custom/Heading'
import ActiveLink from '@/components/atoms/links/ActiveLink'
import { Link } from 'react-feather'
import LogsLadder from '../ladders/LogsLadder'
export default function RightSidebar() {
    return (
        <div className="sticky top-0 lg:h-screen bg-white text-gray-600 overflow-auto">
            <div className="bg-white p-5 top-0 sticky">
                <Heading title="Recent activities" color="primary" size="xs" bold />
            </div>

            <div className=" p-3 md:px-5 ">
                <LogsLadder />

                <div className="flex justify-center">
                    <ActiveLink
                        access={['admin']}
                        href="/dashboard/logs"
                        padding="py-2 px-5"
                    >
                        <Link size={15} strokeWidth={1.5} />
                        View all
                    </ActiveLink>
                </div>
            </div>
        </div>
    )
}
