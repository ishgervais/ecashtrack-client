import Heading from '@/components/atoms/custom/Heading'
import ActiveLink from '@/components/atoms/links/ActiveLink'
import { Plus, PlusCircle } from 'react-feather'
import DropdownTemplate from './DropdownTemplate'

export default function AddItem() {

    const quickAddItemLinks = [
        {
            name: 'New expense',
            path: "/dashboard/expenses/add"
        },
        {
            name: 'New expense category',
            path: "/dashboard/expenses/categories/add"
        },
        {
            name: 'New debt',
            path: "/dashboard/debts/add"
        },
        {
            name: 'New income',
            path: "/dashboard/income/add"
        },
        {
            name: 'New source of income',
            path: "/dashboard/income/source/add"
        }
    ]
    return (
        <DropdownTemplate>
            <div>
                <Heading title="Quick actions" capitalize bold />
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
                                <PlusCircle size={15} strokeWidth= {1.5} />
                                {item.name}
                            </ActiveLink>
                            )
                        })
                    }
                </div>
            </div>
        </DropdownTemplate>
    )
}
