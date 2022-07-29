import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { Api } from "src/pages/api/services/Api";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import Table from "./Table";
import _ from 'lodash'
import { AppContext } from "src/context/GlobalContext";

export default function IncomeSources(): JSX.Element {
  const {incomeSourceStore, setIncomeSourceStore}:any = useContext(AppContext)

  const [reload, setReload] = useState<boolean>(false)

  function handleReload(){
    setReload(!reload)
  }
 
  useEffect(() => {
    let dataArr:any[]=[]

    const loadData = async () => {
      reload && setIncomeSourceStore(null)
      await new Api()
        .connect(EbackendEndpoints.GET_ALL_INCOME_SOURCES, EhttpMethod.GET)
        .then((response) => {
          if (response.success) {
            let res = response.data.docs
            res.reverse()
            res.map((item: any, i: number)=>{
                dataArr.push(_.pick(item,['name','notes','status','createdAt','id']))
              })
              setIncomeSourceStore(dataArr);
            setReload(false)
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
    (!reload || reload || !incomeSourceStore) && loadData();
  }, [incomeSourceStore, reload, setIncomeSourceStore]);

  const cols: string[] = [
    "name",
    'notes',
    "status",
    "date",
  ];
  return (
    <div>

      <div className="flex justify-end">
        
      </div>
      <Table
        model="IncomeSource"
        cols={cols}
        rows={incomeSourceStore}
        actions={["edit","delete"]}
        hide={["id"]}
        populate={[{ model: "", attributes: [""] }]}
        actionPath="/dashboard/income/source/"
        loading={incomeSourceStore ? false: true}
        reload = {() =>handleReload()}


      />
    </div>
  );
}
