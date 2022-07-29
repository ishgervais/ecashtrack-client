import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import Table from "./Table";
import _ from 'lodash'

export default function Incomes(): JSX.Element {
  const {incomeStore, setIncomeStore}:any = useContext(AppContext)
  const [reload, setReload] = useState<boolean>(false)

  function handleReload(){
    setReload(!reload)
  }
  useEffect(() => {
    let dataArr:any[]=[]

    const loadData = async () => {
      reload && setIncomeStore(null)
      await new Api()
        .connect(EbackendEndpoints.GET_ALL_INCOMES, EhttpMethod.GET)
        .then((response) => {
          if (response.success) {
            let res = response.data.docs
            res.reverse()
            res.map((item: any, i: number)=>{
                dataArr.push(_.pick(item,['amount','source',"notes",'status','issued_date','id']))
              })
              setIncomeStore(dataArr);
            setReload(false)

          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
    (!reload || reload || !incomeStore) && loadData();

  }, [incomeStore, reload, setIncomeStore]);

  const cols: string[] = [
    "amount (RWF)",
    "source",
    "notes",
    "status",
    "date",
  ];

  return (
    <div>

      <div className="flex justify-end">
        
      </div>
      <Table
        model="Income"
        cols={cols}
        rows={incomeStore}
        actions={["edit","delete"]}
        hide={["id", "created_by", "__v",]}
        populate={[{ model: "source", attributes: ["name"] }]}
        actionPath="/dashboard/income/"
        loading={incomeStore ? false: true}
        reload = {() =>handleReload()}
      />
    </div>
  );
}
