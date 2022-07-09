/* eslint-disable @next/next/no-img-element */
import Button from '@/components/atoms/custom/Button'
import React from 'react'

export default function NotFound() {
    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center">

            <div className="w-2/3 lg:w-1/2">
                <img src="/images/404.svg" className="w-full md:w-3/4 mx-auto" alt="" />
               <div className="flex justify-center">
               <div className="w-2/3 lg:w-1/6 mt-5">
                    <Button type="button" title="Back Home" path='/dashboard' />
                </div>
               </div>
            </div>
        </div>
    )
}
