/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { menu } from './Menu'
import { Menu, X } from 'react-feather'
import ActiveSpanLink from '@/components/atoms/links/ActiveSpanLink'
import ActiveLink from '@/components/atoms/links/ActiveLink'
import Heading from '@/components/atoms/custom/Heading'
export default function Sidebar() {
    const [toggle, handleToggle] = useState<boolean>(false)

    const sidebar = (
        <div className="text-gray-600 text-sm capitalize relative">
            {menu.map((item: any, i: number) => {
                if (item.children.length !== 0) {
                    return (
                        <ActiveSpanLink
                            key={`item ${i}`}
                            access={['']}
                            tabName={item.name}
                            routes=""
                            tab={<>{item.name}</>}
                            icon =   {item.icon}
                        >
                            
                          
                            {/* submenu */}

                            {item.children.map((subItem: any, i: number) => {
                                return (
                                    <ActiveLink
                                        key={i}
                                        access={['admin']}
                                        href={subItem.path}
                                    >
                                         {subItem.icon}
                                        {subItem.name}
                                    </ActiveLink>
                                )
                            })}
                        </ActiveSpanLink>
                    )
                } else {
                    return (
                        <>
                            <ActiveLink
                                key={i}
                                access={['admin']}
                                href={item.path}
                            >
                                {item.icon}

                                {item.name}
                            </ActiveLink>
                           
                        </>
                    )
                }
            })}

            
        </div>
    )
    return (
        <div className="sticky top-0 lg:h-screen bg-white text-gray-600 p-3 md:px-5 overflow-auto">
            <div className="flex justify-end items-center">
                <div
                    className="text-gray-400 cursor-pointer block lg:hidden"
                    onClick={() => handleToggle(!toggle)}
                >
                    {toggle ? <X /> : <Menu />}
                </div>
            </div>

            <div className={`block lg:hidden ${toggle && 'my-10 h-full'}`}>
                {toggle && sidebar}
            </div>
            {/* desktop sidebar */}
            <div className="hidden lg:block">
               <div className="pl-3">
               <div className="flex items-center">
                   <div className="h-10 py-3 flex gap-2 items-center">
                    <img src="/images/logo.png" className="w-4 h-4" alt="" />
                   <Heading title="e-Cashtrack 1.0" color="primary" size="xs" bold/>
                   </div>
                    </div>
               </div>
                {sidebar}
            </div>

            {/* display translucent bg */}
            {toggle && (
                <div
                    className={`block lg:hidden absolute w-full h-screen bg-black left-0 opacity-60`}
                ></div>
            )}
        </div>
    )
}
