import React from 'react'
import { formatDate } from 'src/util/customFunction'

export default function StyleTableRow(props:{data:string}) {

    const badges = {
        green:'bg-green-500 text-white px-2 text-[10px] rounded-lg text-center',
        yellow:'bg-yellow-500 text-white px-2 text-[10px] rounded-lg text-center',
        red:'bg-red-500 text-white px-2 text-[10px] rounded-lg text-center',

        blue:'bg-blue-700 text-white px-2 text-[10px] rounded-lg text-center',
        pink:'bg-black text-white px-2 text-[10px] rounded-lg text-center'
    }

  return (
    <div className="flex">
        {
                    <div className={`${
                        props.data === 'CONFIRMED'? badges.green:
                        props.data === 'PENDING'?badges.yellow:
                        props.data === 'ACTIVE'? badges.green:
                        props.data === 'INACTIVE'? badges.red:
                        props.data === 'SOMEONE OWES ME'? badges.blue:
                        props.data === 'I OWE SOMEONE'? badges.pink:
                        ''
                    }`}>
                        {formatDate(props.data === 'SOMEONE OWES ME'?'OWES ME':props.data === 'I OWE SOMEONE'?'I OWE':props.data)}
                    </div>
        }

    </div>
  )
}
