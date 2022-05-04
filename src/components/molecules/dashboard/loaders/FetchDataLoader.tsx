import React from 'react'
import { X } from 'react-feather'

export default function FetchDataLoader() {
    return (
        <div className="text-sm absolute w-full bg-green-50 text-green-500 py-2 px-10 flex justify-between">
            <span className="">Fetching data ...</span>
            <div className="bg-green-500 text-white w-5 h-5 flex items-center justify-center rounded-full p-1"><X /></div>
        </div>
    )
}
