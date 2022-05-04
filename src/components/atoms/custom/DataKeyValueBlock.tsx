import React from 'react'
import Heading from './Heading'
import StyleTableRow from './StyleTableRow'

type TDataKeyValueBlock = {
  title:string
    value:any
}
export default function DataKeyValueBlock(props:TDataKeyValueBlock) {
  
  const styleBlock = <StyleTableRow data = {props.value}/>
  return (
    <div className="block">
        <Heading title={props.title} color="text-black"/>

      <div className="flex gap-2 my-4 bg-blue-50 rounded p-3">
      <Heading title={
         typeof props.value === 'number' ?
         new Intl.NumberFormat('en-US').format(props.value)+' RWF':
         styleBlock} color="gray-600"/>

      </div>
    </div>
  )
}
