import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { MenuToggle, SpanLinkProps } from 'src/types'
import { ChevronRight, ChevronDown } from 'react-feather'
import { checkLocalStorage } from 'src/util/customFunction'

export default function ActiveSpanLink(props: SpanLinkProps): JSX.Element {
    const [toggleLink, handleToggleLink] = useState<MenuToggle>()
    const router = useRouter()
    let routes = props.routes.split(',')
    let pathname = router.pathname.split('/')[1]

    // track opened sidebar link
    const openedTab = checkLocalStorage('tab')
    const handleMenuLinkPersistance  = (tab:string)=>{
        if(openedTab.toLowerCase() === tab.toLowerCase()){
            localStorage.removeItem('tab')
        }
        else{
            localStorage.setItem('tab',JSON.stringify(tab))
        }
    }
    return (
        <div>
            <div
                className={`${
                    toggleLink?.tabName === props.tabName &&
                    toggleLink?.active &&
                    'text-gray-600 bg-blue-40'
                } ${
                    routes.includes(pathname) && ''
                } text-sm p-3 flex items-center gap-2 w-full cursor-pointer hover:bg-blue-50 text-gray-600 my-2`}
                onClick={() =>
                   {
                    handleMenuLinkPersistance(props.tabName);   
                    handleToggleLink({
                        tabName: props.tabName,
                        active: !toggleLink?.active
                    })
                }
                }
            >
                   
                <div className="flex gap-2 items-center"> {props.icon} {props.tab}</div>
                <div className="w-full">
                    {(props.tabName).toLowerCase() === openedTab.toLowerCase() ? (
                        <ChevronDown strokeWidth={0.5} className="float-right" />
                    ) : (
                        <ChevronRight  strokeWidth={0.5} className="float-right" />
                    )}
                </div>
            </div>
            {(props.tabName).toLowerCase() === openedTab.toLowerCase() && (
                <div className="pl-5 bg-gray-50 text-gray-500">
                    {props.children}
                </div>
            )}
        </div>
    )
}
