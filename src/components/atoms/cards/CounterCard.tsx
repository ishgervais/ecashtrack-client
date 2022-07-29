import IconHolderLoader from "@/components/molecules/dashboard/loaders/IconHolderLoader";
import ListLoader from "@/components/molecules/dashboard/loaders/ListLoader";
import { useState } from "react";
import Heading from "../custom/Heading";
import IconHolder from "../icons/IconHolder";

type CounterCardProps = {
    icon: object
    total: string
    title: string
    bgColor: string
    loading?: boolean
    amountHidden?: boolean
}
export default function CounterCard(props: CounterCardProps) {
    const [revealAmount, toggleRevealAmount] = useState<boolean>(props.amountHidden ? true : false)
    return (
        <div className={`rounded bg-white px-3 ${props.loading ? 'py-3' : 'py-5'} flex items-center justify-center`}>

            <div className="flex items-center gap-2 w-full">
                <div className="">
                    {props.loading ? <IconHolderLoader /> : <IconHolder icon={props.icon} size="md-sm" bgColor={props.bgColor} />}
                </div>
                {
                    props.loading ? <div className="w-full"><ListLoader count={2} /> </div> :
                        <div className="block">
                            {revealAmount ?
                                <div className="flex gap-1 hover:text-primary cursor-pointer items-center h-5 justify-between w-full"
                                    onClick={() => toggleRevealAmount(!revealAmount)}
                                    title="Click to reveal amount">
                                    {
                                        Array.from(Array(5)).map((i: any, j: number) => {
                                            return (
                                                <span key={j} className="text-3xl text-black">*</span>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <h1 className="font-bold text-sm mb-1 text-black">{props.total}</h1>
                            }
                            <Heading title={props.title} color="gray-400" size="xs" />
                        </div>
                }
            </div>

        </div>
    )
}