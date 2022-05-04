export default function TableLoader() {
    return (
        <div className="w-full">
            {
                Array.from(Array(5)).map((item: any, i: number) => {
                    return (
                        <div key={i} className="w-full">
                            <div className={`bg-white mb-[5px] flex ${i%2=== 0 && 'flex-row-reverse'} justify-between items-center p-5 w-full `}>
                            <div className="w-5 h-5 bg-gray-100 rounded animate-pulse"></div>
                                <div className={`bg-gray-100 w-60 h-5 animate-pulse rounded-xl`}></div>
                                <div className={`bg-gray-100 w-80 h-5 animate-pulse rounded-xl`}></div>
                                <div className={`bg-gray-100 w-44 h-5 animate-pulse rounded-xl`}></div>
                                <div className={`bg-gray-100 w-80 h-5 animate-pulse rounded-xl`}></div>
                                <div className="w-5 h-5 rounded bg-gray-100 animate-pulse"></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}
