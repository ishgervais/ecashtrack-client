import jwt from 'jsonwebtoken'
import { ModelStatus } from '../types'
import { STATUSES } from './customVars'

function getStatus(current_status: string): ModelStatus {
    let statusObj: ModelStatus = {
        status: '',
        color: '',
        parent: ''
    }
    let keys_arr: any = []
    for (let i = 0; i < STATUSES.length; i++) {
        let status: any = STATUSES[i]
        let keys: any = Object.keys(status)
        keys_arr.push(keys)
        status[keys].map((item: any, j: number) => {
            if (item.status === current_status.toUpperCase()) {
                statusObj = item
                let par_attr = { parent: keys_arr[i].toString() }
                Object.assign(statusObj, par_attr)
                // console.log('yoo',arr)
            }
        })
    }
    return statusObj
}
// this function depends on the getStatus()
export function getStatuses(status: string): ModelStatus[] {
    let par_prop = getStatus(status)?.parent
    let arr: ModelStatus[] = [] // store for the arr of returned statuses
    let keys_arr = []
    for (let i = 0; i < STATUSES.length; i++) {
        let status = STATUSES[i]
        let keys = Object.keys(status)
        keys_arr.push(keys)
        if (par_prop === keys_arr[i].toString()) {
            arr = Object.values(STATUSES[i][par_prop])
        }
    }
    return arr
}

export function formatDate(inputDate: any) {
    let date = new Date(inputDate).toDateString()
    if(date !== 'Invalid Date'){
        return date
    }else{
        let substringData = inputDate?.substring(0, 40) 
        inputDate?.length > 40 ? substringData += ' ...' : substringData = inputDate
        return inputDate
    }
}

// checking if the var in localstorage exists
export function checkLocalStorage(key: string) {
    let keyValue: string = ''
    try {
        if (typeof localStorage !== 'undefined') {
            keyValue = localStorage.getItem(key)
                ? JSON.parse(localStorage.getItem(key) || '')
                : ''
        }
    } catch (e: any) {
        console.log('error ', e)
    }
    return keyValue
}

export default function decodeToken(token: string) {
    return jwt.decode(token)
}

export function getCurrentMonth() {
    let date = new Date().toString()
    let month = date.split(' ')[1]
    return month
}

export function getMonthFromDate(date:any){
    let formatedDate:any = formatDate(date) 
     
    return formatedDate && formatedDate.split(' ')[1]
}