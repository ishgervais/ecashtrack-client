import { result } from 'lodash'
import { useContext, useEffect } from 'react'
import { Trash2 } from 'react-feather'
import toast from 'react-hot-toast'
import { AppContext } from 'src/context/GlobalContext'
import { Api } from 'src/pages/api/services/Api'
import { EbackendEndpoints, EhttpMethod } from 'src/types/enums'
import { formatDate } from 'src/util/customFunction'
import LogRowCardLoader from '../loaders/LogRowCardLoader'

export default function LogsLadder() {
    const { historyLogsStore, setHistoryLogsStore }: any = useContext(AppContext)
    useEffect(() => {
        const loadLogs = async () => {
            await new Api().connect(EbackendEndpoints.GET_ALL_HISTORY_LOGS, EhttpMethod.GET)
                .then((response) => {
                    if (response.success) {
                        let logsResp = response.data.docs
                        setHistoryLogsStore(logsResp.reverse())
                    }
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
        !historyLogsStore && loadLogs()
    }, [historyLogsStore, setHistoryLogsStore])

    return (
        <div className="">
            <div className="w-full">
                {historyLogsStore ?
                    historyLogsStore?.map((log: any, i: number) => {
                        return i < 5 && (
                            <div key={i} className="bg-white rounded-lg my-2 text-gray-600 text-sm flex justify-between w-full">
                                <div className="">
                                    <div className="flex">
                                        <span className="block badge bg-white text-primary border-2 border-primary px-1 text-[10px] rounded-lg text-center"> {formatDate(log.createdAt)}</span>

                                    </div>
                                    <div className="flex gap-1 items-center my-2">
                                        <div className="">
                                            {/* ellipse */}

                                            <div className="w-2 h-2 rounded-full border-2 bg-gray-200">

                                            </div>

                                            {/* line */}

                                            <div className="ml-[3px] w-0.5 h-7 bg-gray-200"></div>

                                            
                                        </div>

                                        <span className='text-gray-500 block text-xs'>  {log.activity}</span>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div>
                        {
                            Array.from(Array(5)).map((item: number, i: number) => {
                                return (
                                    <div className="space-y-5 mb-3 w-full" key={i}>
                                        <div className="animate-pulse bg-gray-100 rounded-full w-28 h-5 block"></div>
                                        <div className="animate-pulse bg-gray-100 rounded-full w-full h-5"></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>

        </div>
    )
}
