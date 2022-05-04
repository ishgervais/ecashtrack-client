import {
    Grid,
    DollarSign,
    PieChart,
    CreditCard,
    Settings,
    HelpCircle,
    Book,
    List,
    Plus,
    Database
} from 'react-feather'
import { TMenu } from 'src/types'


export const menu:TMenu[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <Grid size={15} strokeWidth= {1.5} />,
        children: []
    },
    // {
    //     name: 'Account',
    //     path: '/dashboard/account',
    //     icon: <Database size={15} strokeWidth= {1.5} />,
    //     children: []
    // },

    {
        name: 'Expenses',
        path: '/dashboard/expenses',
        icon: <DollarSign size={15} strokeWidth= {1.5} />,
        children: [
            {
                name: 'New expense',
                path: '/dashboard/expenses/add',
                icon: <Plus size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'All expenses',
                path: '/dashboard/expenses',
                icon: <DollarSign size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'New category',
                path: '/dashboard/expenses/categories/add',
                icon: <Plus size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'Categories',
                path: '/dashboard/expenses/categories',
                icon: <List size={15} strokeWidth= {1.5} />,
            }
        ]
    },
    {
        name: 'booking',
        path: '/dashboard/booking',
        icon: <Book size={15} strokeWidth= {1.5} />,
        children: [
            {
                name: 'New booking',
                path: '/dashboard/booking/add',
                icon: <Plus size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'All bookings',
                path: '/dashboard/booking',
                icon: <DollarSign size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'Booking dates',
                path: '/dashboard/booking/bookingdate',
                icon: <List size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'New booking date',
                path: '/dashboard/booking/bookingdate/add',
                icon: <Plus size={15} strokeWidth= {1.5} />,
            },
        ]
    },

    //  to be implement later
    // {
    //     name: 'budget',
    //     path: '/dashboard/budget',
    //     icon: <CreditCard size={15} strokeWidth= {1.5} />,
    //     children: [
    //         {
    //             name: 'New budget',
    //             path: '/dashboard/budget',
    //             icon: <Plus size={15} strokeWidth= {1.5} />,
    //         },
    //         {
    //             name: 'All budgets',
    //             path: '/dashboard/budget',
    //             icon: <DollarSign size={15} strokeWidth= {1.5} />,
    //         },
            
    //     ]
    // },
    {
        name: 'analytics',
        path: '/dashboard/analytics',
        icon: <PieChart size={15} strokeWidth= {1.5} />,
        children: []
    },

    {
        name: 'history logs',
        path: '/dashboard/logs',
        icon: <CreditCard size={15} strokeWidth= {1.5} />,
        children: []
    },
    
    // {
    //     name: 'settings',
    //     path: '/dashboard/settings',
    //     icon: <Settings size={15} strokeWidth= {1.5} />,
    //     children: []
    // },
    // {
    //     name: 'help',
    //     path: '/dashboard/help',
    //     icon: <HelpCircle size={15} strokeWidth= {1.5} />,
    //     children: []
    // },
]
