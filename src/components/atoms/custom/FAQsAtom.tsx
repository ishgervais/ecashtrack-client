import { useState } from "react"
import { ChevronDown, ChevronRight } from "react-feather"
import { FAQsType } from "src/types"



export default function FAQsAtom(props: FAQsType) {
    const [toggle, handleToggle] = useState<boolean>(false)
    return (

        <div className="flex justify-between cursor-pointer p-3 hover:bg-gray-100 my-2" onClick={() => handleToggle(!toggle)}>
           <div className="block text-gray-600">
           <span className="text-sm">
                {props.question}
            </span>
            {toggle && <p className='text-sm mt-3 pl-3 text-gray-500'>
                {props.answer}
            </p>
            }
           </div>

            {toggle ? <ChevronDown size={15} strokeWidth= {1}/>: <ChevronRight size={15} strokeWidth= {1}/>}
        </div>

    )
}









