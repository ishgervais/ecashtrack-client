import Button from "@/components/atoms/custom/Button";
import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AppContext } from "src/context/GlobalContext";
import { Api } from "src/pages/api/services/Api";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import Table from "./Table";
import _ from 'lodash'

export default function Expenses(): JSX.Element {
  const {expenseStore, setExpenseStore}:any = useContext(AppContext)
  const [reload, setReload] = useState<boolean>(false)

  function handleReload(){
    setReload(!reload)
  }
  useEffect(() => {
    let dataArr:any[]=[]

    const loadData = async () => {
      reload && setExpenseStore(null)
      await new Api()
        .connect(EbackendEndpoints.GET_ALL_EXPENSES, EhttpMethod.GET)
        .then((response) => {
          if (response.success) {
            let res = response.data.docs
            res.reverse()
            res.map((item: any, i: number)=>{
                dataArr.push(_.pick(item,['name','category','amount','notes','status','createdAt','id']))
              })
              setExpenseStore(dataArr);
            setReload(false)

          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
    (!reload || reload || !expenseStore) && loadData();

  }, [expenseStore, reload, setExpenseStore]);

  const cols: string[] = [
    "name",
    "category",
    "amount (RWF)",
    "notes",
    "status",
    "date",
  ];

  return (
    <div>

      <div className="flex justify-end">
        
      </div>
      <Table
        model="Expense"
        cols={cols}
        rows={expenseStore}
        actions={["delete", "edit"]}
        hide={["id", "created_by", "__v",]}
        populate={[{ model: "category", attributes: ["name"] }]}
        actionPath="/dashboard/expenses/"
        loading={expenseStore ? false: true}
        reload = {() =>handleReload()}
      />
    </div>
  );
}
