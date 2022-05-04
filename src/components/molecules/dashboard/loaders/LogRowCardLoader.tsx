export default function LogRowCardLoader() {

    return (
        <div className="">
            {
                Array.from(Array(6)).map((item: any, i: number) => {
                    return (
                        <div key={i}>
                              <div className={`bg-white mb-3 flex justify-between p-4 w-full`}>
                                <div className={`flex gap-2 items-center  ${i%2=== 0 && 'flex-row-reverse'}`}>
                                    <div className="w-40 h-5 bg-gray-100  rounded-xl animate-pulse"></div>
                                    <div className={`bg-gray-100 w-60 h-5 animate-pulse  rounded-xl`}></div>
                                </div>
                                <div className="w-5 h-5 rounded bg-gray-100 animate-pulse"></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}
