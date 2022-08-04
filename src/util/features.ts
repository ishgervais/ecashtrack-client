import { NavSearchTypes } from 'src/types'

export const features: NavSearchTypes[] = [
    // expenses
    {
        path: '/dashboard/expenses',
        name: 'Expenses',
        description: 'Manage your expenses',
        dataSet: 'expenses'
    },

    {
        path: '/dashboard/expenses/add',
        name: 'Add expense',
        description: 'Register new expense',
        dataSet: 'expenses, register, add, expenditure, money, cash'
    },

    // expense categories
    {
        path: '/dashboard/expenses/categories/add',
        name: 'Add expense category',
        description: 'Register new expense category',
        dataSet: 'expenses, register, add, expenditure, money, cash, category'
    },

    {
        path: '/dashboard/expenses/categories',
        name: 'Expense categories',
        description: 'Manage all expense categories',
        dataSet: 'expenses, expenditure, money, cash, categories'
    },

    // income

    {
        path: '/dashboard/income',
        name: 'Incomes',
        description: 'Manage your incomes',
        dataSet: 'incomes'
    },

    {
        path: '/dashboard/income/add',
        name: 'Register Income',
        description: 'Register a new income',
        dataSet: 'incomes, register, salary, money, payment, income'
    },
    // debts
    {
        path: '/dashboard/debts',
        name: 'Debts',
        description: 'Manage your debts',
        dataSet: 'debts'
    },

    {
        path: '/dashboard/debts/add',
        name: 'Register Debt',
        description: 'Register a new debt',
        dataSet: 'debts, register, owner, I owe, owned, I owe someone'
    },

    {
        path: '/dashboard/settings',
        name: 'Settings',
        description: 'Manage your settings',
        dataSet: 'settings'
    },
    {
        path: '/dashboard/settings/profile',
        name: 'Profile',
        description: 'Manage your profile',
        dataSet: 'profile'
    },
    {
        path: '/dashboard/logs',
        name: 'History logs',
        description: 'View all history logs',
        dataSet: 'history logs, logs, notifications, my past, historique'
    },

    {
        path: '/dashboard/analytics',
        name: 'Statistics',
        description: 'Statistics, charts, my charts',
        dataSet: 'charts, statistics, my money, investment, loss, gain, profit'
    },

    // home

    {
        path: '/dashboard',
        name: 'Home',
        description: 'My dashboard, overview of my expenses, income, and debts',
        dataSet: 'charts, home, dashboard, root, overview'
    }
]
