import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { Search, X } from 'react-feather'
import { NavSearchTypes } from 'src/types'
import { features } from 'src/util/features'
export default function NavbarSearch(): JSX.Element {
    const router = useRouter()
    const [searchBlock, handleSearchBlock] = useState<Boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [foundModules, setFoundModules] = useState<any>()

    useEffect(() => {

        const searchModules = (searchedText: string) => {

            let searchedModule = new RegExp(searchedText, 'i')

            let module = features.filter((el:any) =>
                el.name.match(searchedModule) || el.description.match(searchedModule) || el.dataSet.match(searchedModule)
            )

            setFoundModules(module)

        }
        searchModules(search)

    }, [search])
    return (
        <>
            <form action="" className="px-2 md:px-5">
                <div className="form-group flex items-center border px-3 py-2 gap-3 rounded-full">
                    <Search className="text-gray-500" size={15} strokeWidth= {1.5} />
                    <input type="text" name="" id="" className="form-control focus:outline-none w-full text-xs"
                        placeholder="Search dashboard ... "
                        value={search}
                        onChange={(el) => { setSearch(el.target.value); handleSearchBlock(true) }}
                    />


                </div>
            </form>

            {/* search block */}
            {searchBlock && search &&
                <div className="bg-white shadow p-2 md:p-3 absolute rounded mr-2 mt-1 w-full z-40">
                    <div className="grid grid-cols-2 w-full">

                        <span className="text-xs text-gray-500 p-3">{foundModules.length === 0 ? 'Service not found' : 'Results'}</span>
                        <div className="flex justify-end items-center">
                            <span className="hover:bg-gray-50 rounded-full sm-img cursor-pointer flex items-center justify-center"
                                onClick={() => { handleSearchBlock(false) }}
                            >
                                <X className="font-bold text-gray-500 hover:bg-primary hover:text-white rounded-full" size={15} strokeWidth= {1.5} />
                            </span>
                        </div>
                    </div>
                    <div className=" max-h-96 overflow-y-auto">


                        {foundModules?.map((module: NavSearchTypes, i: number) => {
                            return (
                                <div key={i} className="hover:bg-green-50 px-3 py-2 cursor-pointer"
                                    onClick={() => { router.push(module.path) }}
                                >
                                    <h1 className="flex gap-1 text-gray-600 text-sm"> 
                                    {/* <FileOutlined className="text-xs text-primary" /> */}
                                     {module.name}</h1>
                                    <p className="text-gray-400 text-xs">{module.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )
}