export enum EbackendEndpoints {
    // user routes
    LOGIN = 'user/login',
    GET_ALL = 'user/all',
    GET_ONE = 'user/',
    CREATE_ACCOUNT = 'user/create',
    UPDATE_ACCOUNT = 'user/update/',
    DELETE_USER_TEMPORARLY = 'user/update/',
    DELETE_USER_PERMANENTLY = 'user/delete/',
    CHANGE_PASSWORD = 'user/',

    // budget routes

    GET_ALL_BUDGETS = 'budget/all',
    GET_ONE_BUDGET = 'budget/',
    GET_USER_BUDGETS = 'budget/user/',
    CREATE_BUDGET = 'budget/create',
    DELETE_BUDGET_PERMANENTLY = 'budget/delete/',
    DELETE_BUDGET_TEMPORARLY = 'budget/update/',

    // expense categories routes

    GET_ALL_EXPENSE_CATEGORIES = 'expense-category/all',
    GET_ONE_EXPENSE_CATEGORIES = 'expense-category/',
    CREATE_EXPENSE_CATEGORY = 'expense-category/create',
    DELETE_EXPENSE_CATEGORIES_PERMANENTLY = 'expense-category/delete/',
    DELETE_EXPENSE_CATEGORIES_TEMPORARLY = 'expense-category/update/',

    // expense routes

    GET_ALL_EXPENSES = 'expense/all',
    GET_ONE_EXPENSE = 'expense/',
    CREATE_EXPENSE = 'expense/create',
    UPDATE_EXPENSE = 'expense/update/',
    DELETE_EXPENSE_PERMANENTLY = 'expense/delete/',
    DELETE_EXPENSE_TEMPORARLY = 'expense/update/',


    GET_ALL_EXPENSES_BY_USER = 'expense/user/',
    GET_ALL_EXPENSES_BY_BUDGET = 'expense/budget/',
    GET_ALL_EXPENSES_BY_CATEGORY = 'expense/category/',

    // income routes

    GET_ALL_INCOMES = 'income/all',
    GET_ONE_INCOME = 'income/',
    CREATE_INCOME = 'income/create',
    UPDATE_INCOME = 'income/update/',
    DELETE_INCOME_PERMANENTLY = 'income/delete/',
    DELETE_INCOME_TEMPORARLY = 'income/update/',


    GET_ALL_INCOME_BY_USER = 'income/user/',
    GET_ALL_INCOME_BY_SOURCE = 'income/source/',


    // income source routes
    GET_ALL_INCOME_SOURCES = 'income-source/all',
    GET_ONE_INCOME_SOURCE = 'income-source/',
    CREATE_INCOME_SOURCE = 'income-source/create',
    UPDATE_INCOME_SOURCE = 'income-source/update/',
    DELETE_INCOME_SOURCE_PERMANENTLY = 'income-source/delete/',
    DELETE_INCOME_SOURCE_TEMPORARLY = 'income-source/update/',

    // logs

    GET_ALL_HISTORY_LOGS = 'history-logs/all',



    //booking 

    GET_ALL_BOOKINGS = 'booking/all',
    GET_ONE_BOOKING = 'booking/',
    GET_ALL_BOOKINGS_BY_PAYMENT_STATUS = 'booking/status/payment/',
    CREATE_BOOKING =  'booking/create',
    UPDATE_BOOKING = 'booking/update/',
    DELETE_BOOKING_TEMPORARLY = 'booking/update/',
    DELETE_BOOKING_PERMANENTLY = 'booking/delete/',

    // booking dates 


    GET_ALL_BOOKING_DATE = 'booking-date/all',
    GET_ALL_ACTIVE_BOOKING_DATES = 'booking-date/status/active',
    CREATE_BOOKING_DATE = 'booking-date/create',
    DELETE_BOOKING_DATE_TEMPORARLY = 'booking-date/update/',
    DELETE_BOOKING_DATE_PERMANENTLY = 'booking-date/delete/',


    // debts
    GET_ALL_DEBTS = 'debt/all',
    GET_ONE_DEBT = 'debt/',
    GET_ALL_DEBTS_BY_PAYMENT_STATUS = 'debt/status/payment/',
    CREATE_DEBT =  'debt/create',
    UPDATE_DEBT = 'debt/update/',
    DELETE_DEBT_TEMPORARLY = 'debt/update/',
    DELETE_DEBT_PERMANENTLY = 'debt/delete/',




    // statistics

        GET_BOOKING_STATISTICS = 'booking/year/',
        //debts
        GET_DEBT_STATISTICS = 'debt/year/',
        GET_DEBT_STATISTICS_BY_CATEGORY = 'debt/year-category/',
        // expenses
        GET_EXPENSE_STATISTICS = 'expense/year/',
        GET_EXPENSE_STATISTICS_BY_CATEGORY = 'expense/year-category/',
        //income
        GET_INCOME_STATISTICS = 'income/year/',
        GET_INCOME_STATISTICS_BY_SOURCE = 'income/year-source/',


    // total counts
    GET_TOTAL_COUNTS = 'total-counts/all'
}

export enum EhttpMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT'
}
export enum ACCOUNT_TYPE {
    SUPER_ADMIN = 'SUPER_ADMIN',
    USER = 'USER'
}

export enum CUSTOM_STATUS {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export enum CURRENCIES {
    RWF = 'RWF',
    USD = 'USD',
    EURO = 'EURO'
}

export enum EXPENSE_CATEGORIES {
    LIABILITY = 'LIABILITY',
    LUXURY = 'LUXURY'
}

export enum EDebtStatus{
    SOMEONE_OWES_ME = 'SOMEONE OWES ME',
    I_OWE_SOMEONE = 'I OWE SOMEONE'
}
