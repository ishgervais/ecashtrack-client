import {
    Grid,
    DollarSign,
    PieChart,
    CreditCard,
    Settings,
    List,
    Plus,
    Package,
    User,
    PlusCircle
} from 'react-feather'
import { TMenu } from 'src/types'


export const menu:TMenu[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <Grid size={15} strokeWidth= {1.5} />,
        children: []
    },
   
// to be developed later
    // {
    //     name: 'My Account',
    //     path: '/dashboard/account',
    //     icon: <User size={15} strokeWidth= {1.5} />,
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
                icon: <List size={15} strokeWidth= {1.5} />,
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
        name: 'Debts',
        path: '/dashboard/debts',
        icon: <Package size={15} strokeWidth= {1.5} />,
        children: [
            {
                name: 'New debt',
                path: '/dashboard/debts/add',
                icon: <Plus size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'All debts',
                path: '/dashboard/debts',
                icon: <List size={15} strokeWidth= {1.5} />,
            },
        ]
    },

    {
        name: 'Income',
        path: '/dashboard/income',
        icon: <DollarSign size={15} strokeWidth= {1.5} />,
        children: [
            {
                name: 'Add income',
                path: '/dashboard/income/add',
                icon: <CreditCard size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'Income list',
                path: '/dashboard/income',
                icon: <List size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'Add income source',
                path: '/dashboard/income/source/add',
                icon: <PlusCircle size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'Income source list',
                path: '/dashboard/income/source',
                icon: <List size={15} strokeWidth= {1.5} />,
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
        name: 'logs',
        path: '/dashboard/logs',
        icon: <CreditCard size={15} strokeWidth= {1.5} />,
        children: []
    },

    {
        name: 'Settings',
        path: '/dashboard/settings',
        icon: <Settings size={15} strokeWidth= {1.5} />,
        children: [
            {
                name: 'Profile settings',
                path: '/dashboard/settings/profile',
                icon: <User size={15} strokeWidth= {1.5} />,
            },
            {
                name: 'System settings',
                path: '/dashboard/settings/system',
                icon: <Settings size={15} strokeWidth= {1.5} />,
            },
        ]
    },



    
  
    // {
    //     name: 'help',
    //     path: '/dashboard/help',
    //     icon: <HelpCircle size={15} strokeWidth= {1.5} />,
    //     children: []
    // },
]
