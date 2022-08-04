import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import Table from "./Table";
import _ from 'lodash'

export default function Debts(): JSX.Element {

  const {debtStore, setDebtStore}:any = useContext(AppContext)
  // const [expenses, setExpenses] = useState<any>();

  const [reload, setReload] = useState<boolean>(false)

  function handleReload(){
    setReload(!reload)
  }
  useEffect(() => {
    let dataArr:any[]=[]

    const loadBookings = async () => {
      // reload && setExpenses(null)
      reload && setDebtStore(null)
      await new Api()
        .connect(EbackendEndpoints.GET_ALL_DEBTS, EhttpMethod.GET)
        .then((response) => {
          if (response.success) {
            let res = response.data.docs
            res.reverse()
            res.map((item: any, i: number)=>{
                dataArr.push(_.pick(item,['name','payment','estimated_payment','payment_status','holder_status','id','notes','issued_date']))
              })
            setDebtStore(dataArr)
            // setExpenses(dataArr);
            setReload(false)
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
    (!reload || reload || !debtStore) && loadBookings();
  }, [debtStore, reload, setDebtStore]);

  const cols: string[] = [
    "names",
    "paid amount",
    "Total to be paid back",
    "Payment status",
    "Ownership",
    "Notes",
    "Issued date"
  ];

  return (
    <div>

      <div className="flex justify-end">
        
      </div>
      <Table
        model="Debt"
        cols={cols}
        rows={debtStore}
        actions={["view","edit", "delete"]}
        hide={["id", "created_by", "__v",]}
        populate={[{ model: "", attributes: [""] }]}
        actionPath="/dashboard/debts/"
        loading={debtStore ? false: true}
        reload = {() =>handleReload()}
      />
    </div>
  );
}
