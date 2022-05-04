export default function ListLoader(props:{count?:number}) {
    return (
        <div className="">
            {
                Array.from(Array(props.count?props.count:4)).map((item: any, i: number) => {
                    return (
                                <div key={i} className={`${i%2===0 ?'w-2/3':'w-1/3'} h-5 rounded bg-gray-100 animate-pulse mb-2`}></div>
                    )
                })
            }
        </div>

    )
}
