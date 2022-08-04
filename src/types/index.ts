import { type } from "os"
import { CURRENCIES, CUSTOM_STATUS, EDebtStatus } from "./enums"

export interface ButtonProps {
    title: string
    style?: string
    loading?: boolean
    loadingTitle?: string | null
    path?:string
    color?:string
    bgColor?:string
    shadow?:string
    padding?:string
    disabled?:boolean
    type?:string
    handleClick?:()=>void
}
export interface LinkProps {
    href: string
    children: object
    access: string[]
    padding?: string
}
export interface ToastProps {
    status: string
    message: any
}

export interface OperationStatus {
    status: boolean
    message: string
}

export type TableProps = {
    model?: string
    cols?: string[]
    rows?: any[]
    hide?: string[]
    populate?: { model: string; attributes: string[] }[]
    actions?: string[]
    loading?:boolean
    actionPath?:string
    reload:()=>void

}
export type RowProps = {
    data?: Object
    keys?: string[]
    populate?: { model: string; attributes: string[] }[]
}

export type ModelStatus = {
    status: string
    color: string
    parent?: string
}

export type MenuToggle = {
    tabName: string
    active: boolean
}

export type SpanLinkProps = {
    tab: object
    tabName: string
    children: object
    routes: string
    access?: string[]
    icon?:object
}
export type DashboardType = {
    title: string
    children?: object
}

export type FAQsType = {
    question : string
    answer : string
}
export type TUser = {
    first_name : string
    last_name : string
    email : string
    phone_number: string
    password : string
    confirmPassword?:string
    newPassword? : string

}


export type TExpenseCategory = {
    name:string
    notes?:string
}

export  type TExpense = {
    name:string
    amount: number
    month:string
    year:number
    category?:any
    notes:string

}

export type TBudget  = {
    name:string
    initiated_amount:number
    consumed_amount?:number
    description:string
    start_date:string
    end_date:string
    status:CUSTOM_STATUS
    currency:CURRENCIES
    user:TUser
}
export type TMenu = {
    name:string
    path:string
    icon?:object
    children?:TMenu[]
}

export type TBookingDate = {
    date:Date
    count:number
}

export type TBooking = {
    client_names:string
    booking_date:TBookingDate
    payment:number
    estimated_payment:number
    payment_status:string
    status:string
    notes:string
    createdAt:string
}

export type TDebt = {
    name:string
    payment:number
    estimated_payment:number
    holder_status:EDebtStatus
    status:string
    payment_status:string
    // req body types
    issued_date:string
    notes:string

}


export interface TIncome {
    amount:number
    month:string
    year:number
    notes:string
    source:TIncomeSource | any
    created_by:TUser | any
    currency:CURRENCIES
    status:CUSTOM_STATUS
    issued_date:string
}

export interface TIncomeSource{
    name:string
    notes:string
    status:CUSTOM_STATUS
    created_by:TUser | any
}

// nav search


export interface NavSearchTypes {
    name: string;
    path: string;
    description: string;
    dataSet: string;
    access?: string[];
  }