import { useContext, useEffect } from 'react'
import {Trash2 } from 'react-feather'
import toast from 'react-hot-toast'
import { AppContext } from 'src/context/GlobalContext'
import { Api } from 'src/pages/api/services/Api'
import { EbackendEndpoints, EhttpMethod } from 'src/types/enums'
import { formatDate } from 'src/util/customFunction'
import LogRowCardLoader from '../loaders/LogRowCardLoader'

export default function LogRowCard() {
  const {historyLogsStore, setHistoryLogsStore}:any = useContext(AppContext)
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
      {historyLogsStore?
        historyLogsStore?.map((log: any, i: number) => {
          return (
            <div key={i} className="bg-white rounded-lg p-4 text-gray-600 text-sm mb-3 flex justify-between">
             <div className="flex gap-2 items-center">
            <span className="p-1 badge bg-green-500 rounded text-xs text-white"> {formatDate(log.createdAt)}</span>
           <span>  {log.activity}</span>
             </div>
              <Trash2 className="text-red-500 cursor-pointer"/>
            </div>
          )
        })
        : <LogRowCardLoader/>
      }
    </div>
  )
}
