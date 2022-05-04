import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { Api } from "src/pages/api/services/Api";
import { EbackendEndpoints, EhttpMethod } from "src/types/enums";
import Table from "./Table";
import _ from 'lodash'
import { AppContext } from "src/context/GlobalContext";

export default function ExpenseCategories(): JSX.Element {
  const {expenseCategoryStore, setExpenseCategoryStore}:any = useContext(AppContext)

  const [reload, setReload] = useState<boolean>(false)

  function handleReload(){
    setReload(!reload)
  }
 
  useEffect(() => {
    let dataArr:any[]=[]

    const loadData = async () => {
      reload && setExpenseCategoryStore(null)
      await new Api()
        .connect(EbackendEndpoints.GET_ALL_EXPENSE_CATEGORIES, EhttpMethod.GET)
        .then((response) => {
          if (response.success) {
            let res = response.data.docs
            res.reverse()
            res.map((item: any, i: number)=>{
                dataArr.push(_.pick(item,['name','notes','status','createdAt','id']))
              })
              setExpenseCategoryStore(dataArr);
            setReload(false)
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };
    (!reload || reload || !expenseCategoryStore) && loadData();
  }, [expenseCategoryStore, reload, setExpenseCategoryStore]);

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
        model="ExpenseCategory"
        cols={cols}
        rows={expenseCategoryStore}
        actions={["delete"]}
        hide={["id"]}
        populate={[{ model: "", attributes: [""] }]}
        loading={expenseCategoryStore ? false: true}
        reload = {() =>handleReload()}


      />
    </div>
  );
}
